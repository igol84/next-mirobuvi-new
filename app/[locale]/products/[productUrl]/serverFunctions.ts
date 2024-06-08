import 'server-only'

import {ProductType, ShoesType, SimpleProductProps, SizeType} from "@/components/product/types";
import {dateDiffInDays, DAYS_IS_NEW} from "@/utility/functions";
import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {ProductWithDetailsDBType} from "@/lib/db/product";
import _ from "lodash";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";

type ProductFabrice = {
  (
    locale: Locale,
    product: ProductWithDetailsDBType,
    urlImages: string[],
    userId: string | undefined,
    isFavorite: boolean
  ): ProductType
}

export const productFabrice: ProductFabrice = (locale, product, urlImages, userId, isFavorite) => {
  const name = locale === 'en' ? product.name_en : product.name_ua
  const desc = locale === 'en' ? product.text_en : product.text_ua
  const price_prefix = locale === 'en' ? '₴' : 'грн.'
  const date = product.date
  const daysInterval = dateDiffInDays(date, new Date())
  const isNew = daysInterval < DAYS_IS_NEW
  switch (product.type) {
    case "shoes": {
      const sizes: SizeType[] = product.shoeses.map(shoes => ({
        size: shoes.size, length: shoes.length, inStock: shoes.is_available
      }))
      const sortedSizes = _.sortBy(sizes, 'size')
       const shoes: ShoesType = {
        id:product.id, name, price: product.price, price_prefix, type: 'shoes', url: product.url,
        images: urlImages, desc, userId, isFavorite, isNew, sizes: sortedSizes, inStock: !!product.is_available
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

export async function getBreadCrumbData(locale: Locale, product: ProductWithDetailsDBType): Promise<BreadCrumbData[]> {
  const t = await getTranslations({locale, namespace: 'breadcrumb'})
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: t('brands'),
    href: `/${locale}/brands`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label: product.brand ? product.brand.name_en : '',
    href: `/${locale}/brands/${product.brand.url}`
  }
  breadCrumbs.push(currentBrandCrumb)

  const currentProductCrumb: BreadCrumbData = {
    label: locale === 'en' ? product.name_en : product.name_ua,
    href: '#'
  }
  breadCrumbs.push(currentProductCrumb)
  return breadCrumbs
}
