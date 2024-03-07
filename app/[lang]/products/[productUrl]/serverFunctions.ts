import 'server-only'

import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {ProductSchema} from "@/schemas/data";
import {ProductType} from "@/components/product/types";
import {dateDiffInDays, DAYS_IS_NEW, formatStringToData} from "@/utility/functions";
import {createWithEmptySizes} from "@/utility/sizes";
import {BreadCrumbData} from "@/components/base/BreadCrumb";

type ProductFabrice = {
  (
    lang: Lang,
    product: ProductSchema,
    userId: string | undefined,
    isFavorite: boolean
  ): ProductType
}

export const productFabrice: ProductFabrice = (lang, product, userId, isFavorite) => {
  const name = lang === 'en' ? product.name : product.name_ua
  const desc = lang === 'en' ? product.desc : product.desc_ua
  const price_prefix = lang === 'en' ? '₴' : 'грн.'
  const date = formatStringToData(product.date)
  const daysInterval = dateDiffInDays(date, new Date())
  const isNew = daysInterval < DAYS_IS_NEW
  switch (product.type) {
    case "product": {
      return {
        name, product_key: product.url, price: product.price, price_prefix, type: 'product', qty: product.qty,
        images: product.images, desc, userId, isFavorite, isNew
      }
    }
    case "shoes": {
      const allSizes = createWithEmptySizes(product.sizes)
      return {
        name, product_key: product.url, price: product.price, price_prefix, type: 'shoes', qty: product.qty,
        images: product.images, desc, userId, isFavorite, isNew, sizes: allSizes
      }
    }
  }
}

export async function getBreadCrumbData(lang: Lang, product: ProductSchema): Promise<BreadCrumbData[]>  {
  const dict = await getDictionary(lang)
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: dict.breadcrumb.brands,
    href: `/${lang}/brands`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label: product.brand ? product.brand : '',
    href: `/${lang}/brands/${product.brand_url?.toString()}`
  }
  breadCrumbs.push(currentBrandCrumb)

  const currentProductCrumb: BreadCrumbData = {
    label: lang === 'en' ? product.name : product.name_ua,
    href: '#'
  }
  breadCrumbs.push(currentProductCrumb)
  return breadCrumbs
}
