import 'server-only'
import {PageType, ProductType} from "@/components/Products/types";
import {countPrice, dateDiffInDays, DAYS_IS_NEW} from "@/utility/functions";
import {ProductWithDetailsDBType} from "@/lib/db/product";
import {getProductImageUrl} from "@/lib/productCardData";
import {Locale} from "@/i18n";

interface CreateProduct {
  (
    product: ProductWithDetailsDBType,
    locale: Locale,
    userDiscount: number,
    page?: PageType
  ): ProductType
}

export const createProduct: CreateProduct = (product, locale, userDiscount, page = 'catalog') => {
  const name = locale === 'en' ? product.name_en : product.name_ua
  const oldPrice = product.discount || userDiscount ? product.price : null
  const price = countPrice(product.price, product.discount, userDiscount)
  const price_prefix = locale === 'en' ? '₴' : 'грн.'
  const date = product.date
  const daysInterval = dateDiffInDays(product.date, new Date())
  const isNew = daysInterval < DAYS_IS_NEW
  const imageUrl = getProductImageUrl(product.url, product.imgUpdatedAt?.getTime())
  switch (product.type) {
    case "shoes": {
      const sizes: number[] = product.shoeses.filter(shoes => shoes.is_available).map(shoes => shoes.size).sort()
      const isAvailable = !!product.is_available && sizes.length > 0
      return {
        id: product.id, name, url: product.url, imageUrl, isAvailable, color: product.color,
        price, oldPrice, price_prefix, type: 'shoes', sizes, page, date, isNew, tags: product.tags,
        season: product.season
      }
    }
    default: {
      return {
        id: product.id, name, url: product.url, imageUrl, isAvailable: !!product.is_available, color: product.color,
        price, oldPrice, price_prefix, type: 'product', page, date, isNew, tags: product.tags,
        season: product.season
      }
    }

  }
}