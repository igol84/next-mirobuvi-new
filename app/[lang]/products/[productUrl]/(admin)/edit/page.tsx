import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {checkForAdmin} from "@/utility/auth";
import {redirect} from "next/navigation";
import {getProductByUrl, getProductUrls} from "@/lib/db/product";
import {ProductFormSchema} from "@/components/product/admin/types";
import {Heading, VStack} from "@chakra-ui/react";
import BreadCrumb from "@/components/base/BreadCrumb";
import ProductForm from "@/components/product/admin/ProductForm";
import React from "react";
import {getBreadCrumb} from "@/app/[lang]/products/[productUrl]/(admin)/edit/serverFunctions";
import {getBrand} from "@/lib/db/brand";
import {getAllImages, getFTPClient} from "@/lib/ftp";
import {env} from "@/lib/env";
import {Image} from "@/components/product/admin/ProductImage";
import {SizeType} from "@/components/product/admin/shoes/types";
import _ from "lodash";
import {getProductImageUrl} from "@/lib/productCardData";

type Props = {
  params: {
    lang: Lang
    productUrl: string
  }
}


const ProductEditPage = async ({params: {lang, productUrl}}: Props) => {
  const dict = await getDictionary(lang)
  const isAdmin = await checkForAdmin()
  if (!isAdmin) redirect('/')
  const productData = await getProductByUrl(productUrl)
  if (!productData) redirect(`/`)
  const brandData = await getBrand(productData.brand_id)
  if (!brandData) redirect(`/`)
  const productName = lang === 'en' ? productData.name_en : productData.name_ua
  const brandName = lang === 'en' ? brandData.name_en : brandData.name_ua
  const breadCrumb = await getBreadCrumb(lang, brandName, brandData.url, productName, productUrl)
  const allProductUrls = await getProductUrls()
  const urlList = allProductUrls.filter(url => url !== productData.url)
  const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
  const images = await getAllImages(ftpClient, `products/${productData.url}`)
  ftpClient.close()
  const urlImages: Image[] = images.map(image => ({
    name: image,
    url: getProductImageUrl(productData.url, productData.imgUpdatedAt?.getTime(), image)
  }))
  const shoeses: SizeType[] = productData.shoeses.map((shoe) => (
    {size: shoe.size, isAvailable: shoe.is_available, length: shoe.length}
  ))
  const sortedShoes = _.sortBy(shoeses, 'size')
  const defaultValues: ProductFormSchema = {
    id: productData.id,
    nameEn: productData.name_en,
    nameUa: productData.name_ua,
    titleUa: productData.title_ua,
    titleEn: productData.title_en,
    metaDescEn: productData.meta_desc_en,
    metaDescUa: productData.meta_desc_ua,
    tags: productData.tags,
    url: productData.url,
    textEn: productData.text_en,
    textUa: productData.text_ua,
    active: productData.active,
    private: productData.private,
    isAvailable: !!productData.is_available,
    price: productData.price,
    oldPrice: productData.old_price,
    promActive: productData.prom_active,
    promAddToId: productData.prom_add_to_id,
    season: productData.season,
    color: productData.color,
    filesImg: [],
    type: productData.type,
    brandId: productData.brand_id
  }
  return (
    <VStack align='left' spacing={4}>
      <BreadCrumb breadCrumbs={breadCrumb}/>
      <Heading as='h1'>{dict.productAdmin.editProduct} {productName}</Heading>
      <ProductForm defaultValues={defaultValues} shoeses={sortedShoes} urlList={urlList} urlImages={urlImages}/>
    </VStack>
  )
}

export default ProductEditPage
