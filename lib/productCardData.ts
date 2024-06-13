import {PageType, ProductType, ShoesType, SimpleProductProps} from "@/components/Products/types";
import {countPrice, dateDiffInDays, DAYS_IS_NEW} from "@/utility/functions";
import {env} from "@/lib/env";
import {ProductWithDetailsDBType} from "@/lib/db/product";
import {Locale} from "@/i18n";

interface CreateProduct {
  (
    product: ProductWithDetailsDBType,
    locale: Locale,
    page?: PageType
  ): ProductType
}

export const getProductImageUrl = (productName: string, key: number = 0, imgName: string = '1.jpeg'): string => {
  return `${env.FTP_URL}/products/${productName}/${imgName}?key=${key}`
}

export const createProduct: CreateProduct = (product, locale, page = 'catalog') => {
  const name = locale === 'en' ? product.name_en : product.name_ua
  const oldPrice = product.discount ? product.price : null
  const price = countPrice(product.price, product.discount)
  const price_prefix = locale === 'en' ? '₴' : 'грн.'
  const date = product.date
  const daysInterval = dateDiffInDays(date, new Date())
  const isNew = daysInterval < DAYS_IS_NEW
  const imageUrl = getProductImageUrl(product.url, product.imgUpdatedAt?.getTime())
  switch (product.type) {
    case "shoes": {
      const sizes: number[] = product.shoeses.filter(shoes => shoes.is_available).map(shoes => shoes.size).sort()
      const isAvailable = !!product.is_available && sizes.length > 0
      const shoes: ShoesType = {
        id: product.id, name, url: product.url, isAvailable, imageUrl, color: product.color,
        season: product.season, price, oldPrice, price_prefix, page, date, isNew, tags: product.tags,
        type: 'shoes', sizes
      }
      return shoes
    }
    default: {
      const simpleProduct: SimpleProductProps = {
        id: product.id, name, url: product.url, isAvailable: !!product.is_available, imageUrl, color: product.color,
        season: product.season, price, oldPrice, price_prefix, page, date, isNew, tags: product.tags,
        type: 'product'
      }
      return simpleProduct
    }
  }
}