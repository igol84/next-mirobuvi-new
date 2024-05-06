import 'server-only'

import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {ProductType, ShoesType, SimpleProductProps, SizeType} from "@/components/product/types";
import {dateDiffInDays, DAYS_IS_NEW} from "@/utility/functions";
import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {ProductWithDetailsDBType} from "@/lib/db/product";

type ProductFabrice = {
  (
    lang: Lang,
    product: ProductWithDetailsDBType,
    urlImages: string[],
    userId: string | undefined,
    isFavorite: boolean
  ): ProductType
}

export const productFabrice: ProductFabrice = (lang, product, urlImages, userId, isFavorite) => {
  const name = lang === 'en' ? product.name_en : product.name_ua
  const desc = lang === 'en' ? product.text_en : product.text_ua
  const price_prefix = lang === 'en' ? '₴' : 'грн.'
  const date = product.date
  const daysInterval = dateDiffInDays(date, new Date())
  const isNew = daysInterval < DAYS_IS_NEW
  switch (product.type) {
    case "shoes": {
      const sizes: SizeType[] = product.shoeses.map(shoes => ({
        size: shoes.size, length: shoes.length, inStock: shoes.is_available
      }))
       const shoes: ShoesType = {
        id:product.id, name, price: product.price, price_prefix, type: 'shoes', url: product.url,
        images: urlImages, desc, userId, isFavorite, isNew, sizes: sizes, inStock: !!product.is_available
      }
      return shoes
    }
    default: {
      const singleProduct: SimpleProductProps = {
        id:product.id, name, price: product.price, price_prefix, type: 'product', url: product.url,
        images: urlImages, desc, userId, isFavorite, isNew, inStock: !!product.is_available
      }
      return singleProduct
    }
  }
}

export async function getBreadCrumbData(lang: Lang, product: ProductWithDetailsDBType): Promise<BreadCrumbData[]> {
  const dict = await getDictionary(lang)
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: dict.breadcrumb.brands,
    href: `/${lang}/brands`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label: product.brand ? product.brand.name_en : '',
    href: `/${lang}/brands/${product.brand.url}`
  }
  breadCrumbs.push(currentBrandCrumb)

  const currentProductCrumb: BreadCrumbData = {
    label: lang === 'en' ? product.name_en : product.name_ua,
    href: '#'
  }
  breadCrumbs.push(currentProductCrumb)
  return breadCrumbs
}
