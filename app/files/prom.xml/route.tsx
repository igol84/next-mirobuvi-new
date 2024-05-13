import 'server-only'
import {getBrands} from "@/lib/db/brand";
import {getProducts} from "@/lib/db/product";
import _ from "lodash";
import {getAllImages, getFTPClient} from "@/lib/ftp";
import {env} from "@/lib/env";
import {getProductImageUrl} from "@/lib/productCardData";

export const revalidate = 60*60*5

type Offer = {
  id: string,
  group_id: string,
  name: string,
  name_ua: string,
  categoryId: string,
  price: string,
  vendor: string,
  description: string,
  description_ua: string,
  images: string,
  param: string
}

export async function GET() {
  const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
  const brands = await getBrands()
  const categories = brands.map(brand => ({
    id: brand.id,
    name: brand.name_en
  }))
  const categoriesXML = categories.map(category => {
    return `<category id="${category.id}">${category.name}</category>`
  }).join('\n\t')

  const allProducts = await getProducts()
  const promProducts = allProducts.filter(product => {
    return product.prom_active && product.is_available
  })
  const offers: Offer[] = []
  let offersXML = ''
  for (const product of promProducts) {
    const imagesNames = await getAllImages(ftpClient, `products/${product.url}`)
    const urlImages = imagesNames.map(name => getProductImageUrl(product.url, product.imgUpdatedAt?.getTime(), name))
    const images = urlImages.map(image => `<picture>${image}</picture>`).join('\n')
    if (product.type === 'product') {
      offers.push({
        id: String(product.id),
        group_id: String(product.id),
        name: product.name_ru,
        name_ua: product.name_ua,
        categoryId: String(product.brand_id),
        price: String(_.ceil(product.price/0.84, -1)+10),
        vendor: product.brand.name_en,
        description: _.escape("<div style='text-align: center'>Доставка 1-2 дня.</div>"),
        description_ua: _.escape("<div style='text-align: center'>Доставка 1-2 дня.</div>"),
        images,
        param: ''
      })
    } else if (product.type === 'shoes') {
      const allSizes = []
      let descSizes = ''
      for (const shoes of product.shoeses) {
        if (shoes.is_available) {
          allSizes.push(shoes.size)
          descSizes += ` <tr><td>${shoes.size}</td><td>${shoes.length}см.</td></tr> `
        }
      }
      for (const shoes of product.shoeses) {
        if (shoes.is_available) {
          const name = `${product.name_ru} ${shoes.size}. Размеры в наличии: ${allSizes.join(', ')}.`
          const name_ua = `${product.name_ua} ${shoes.size}. Розміри в наявності: ${allSizes.join(', ')}.`
          const description = `<table border="1" style="width:500px"> <tbody><tr><th>Размеры в наличии</th> \
                               <th>Длина стельки(см)</th></tr> ${descSizes} </tbody></table>`
          const description_ua = `<table border="1" style="width:500px"> <tbody><tr><th>Розміри в наявності</th> \
                                  <th>Довжина устілки(см)</th></tr> ${descSizes} </tbody></table>`
          offers.push({
            id: `${product.id}${shoes.size}`,
            group_id: String(product.id),
            name,
            name_ua,
            categoryId: String(product.brand_id),
            price: String(_.ceil(product.price/0.84, -1)+10),
            vendor: product.brand.name_en,
            description: _.escape(description),
            description_ua: _.escape(description_ua),
            images,
            param: `<param name="Розмір взуття(устілка)" unit="">${shoes.size}(${shoes.length})</param>`
          })
        }
      }
    }
  }
  ftpClient.close()
  offers.forEach(data => {
    offersXML += `
          <offer id="${data.id}" available="true" in_stock="На складі" group_id="${data.group_id}">
            <name>${data.name}</name>
            <name_ua>${data.name_ua}</name_ua>
            <delivery>true</delivery>
            <categoryId>${data.categoryId}</categoryId>
            <portal_category_id>3220713</portal_category_id>
            <price>${data.price}</price>
            <oldprice/>
            <currencyId>UAH</currencyId>
            ${data.images}
            <vendor>${data.vendor}</vendor>
            <barcode>${data.group_id}</barcode>
            <description>${data.description}</description>
            <description_ua>${data.description_ua}</description_ua>
            ${data.param}
          </offer>
        `
  })
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE yml_catalog SYSTEM "shops.dtd">
  <shop>
    <categories>
    ${categoriesXML}
    </categories>
    <offers>
    ${offersXML}
    </offers>
  </shop>`;

  return new Response(xmlContent, {headers: {"Content-Type": "text/xml"}});
}