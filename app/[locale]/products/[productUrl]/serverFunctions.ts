import 'server-only'

import {ProductType, ShoesType, SimilarProduct, SimpleProductProps, SizeType} from "@/components/product/types";
import {countPrice, countRatePrice, dateDiffInDays, DAYS_IS_NEW} from "@/utility/functions";
import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getProductsByGroupName, ProductWithDetailsDBType} from "@/lib/db/product";
import _ from "lodash";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";
import {getProductImageUrl} from "@/lib/productCardData";

type ProductFabrice = {
  (
    locale: Locale,
    product: ProductWithDetailsDBType,
    urlImages: string[],
    userId: string | undefined,
    isFavorite: boolean,
    userDiscount: number,
    similarProducts: SimilarProduct[]
  ): ProductType
}

export const productFabrice: ProductFabrice = (
  locale, product, urlImages, userId, isFavorite, userDiscount, similarProducts
) => {
  const name = locale === 'en' ? product.name_en : product.name_ua
  const desc = locale === 'en' ? product.text_en : product.text_ua
  const defaultPrice = product.price
  const oldPrice = product.discount || userDiscount ? countRatePrice(product.price) : null
  const price = countPrice(product.price, product.discount, userDiscount)
  const price_prefix = locale === 'en' ? '₴' : 'грн.'
  const discount = product.discount
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
        id: product.id, name, defaultPrice, price, oldPrice, price_prefix, discount, type: 'shoes', url: product.url,
        images: urlImages, desc, userId, isFavorite, isNew, sizes: sortedSizes, inStock: !!product.is_available,
        similarProducts: similarProducts
      }
      return shoes
    }
    default: {
      const singleProduct: SimpleProductProps = {
        id: product.id, name, defaultPrice, price, oldPrice, price_prefix, discount, type: 'product', url: product.url,
        images: urlImages, desc, userId, isFavorite, isNew, inStock: !!product.is_available,
        similarProducts: similarProducts
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

type GetSimilarProducts = {
  (
    productDBData: ProductWithDetailsDBType,
    locale: Locale,
    isAuth: boolean,
    isAdmin: boolean
  )
    : Promise<SimilarProduct[]>
}

export const getSimilarProducts: GetSimilarProducts = async (productDBData, locale, isAuth, isAdmin) => {
  if(!productDBData.group_name) return []
  let similarProductsDB = await getProductsByGroupName(productDBData.group_name)
  similarProductsDB = similarProductsDB.filter(product=>product.url!==productDBData.url)
  if(!isAuth)
    similarProductsDB = similarProductsDB.filter(product=>!product.private)
  if(!isAdmin)
    similarProductsDB = similarProductsDB.filter(product=>product.active)
  return similarProductsDB.map(product => {
    const urlImage = getProductImageUrl(product.url, product.imgUpdatedAt?.getTime(), '1.jpeg')
    return {
      name: locale === 'en' ? product.name_en : product.name_ua,
      url: product.url,
      urlImage: product.imgCount > 0 ? urlImage : 'defaultUrlImage'
    }
  })
}
