import {Lang} from "@/dictionaries/get-dictionary";
import {PageType, ProductType, ShoesType, SimpleProductProps} from "@/components/Products/types";
import {dateDiffInDays, DAYS_IS_NEW} from "@/utility/functions";
import {env} from "@/lib/env";
import {ProductWithDetailsDBType} from "@/lib/db/product";

interface CreateProduct {
  (
    product: ProductWithDetailsDBType,
    lang: Lang,
    page?: PageType
  ): ProductType
}

export const getProductImageUrl = (productName: string, key: number = 0, imgName: string = '1.jpeg'): string => {
  return `${env.FTP_URL}/products/${productName}/${imgName}?key=${key}`
}

export const createProduct: CreateProduct = (product, lang, page = 'catalog') => {
  const name = lang === 'en' ? product.name_en : product.name_ua
  const price_prefix = lang === 'en' ? '₴' : 'грн.'
  const date = product.date
  const daysInterval = dateDiffInDays(date, new Date())
  const isNew = daysInterval < DAYS_IS_NEW
  const imageUrl = getProductImageUrl(product.url, product.imgUpdatedAt?.getTime())
  switch (product.type) {
    case "shoes": {
      const sizes: number[] = product.shoeses.map(shoes => shoes.size).sort()
      const shoes: ShoesType = {
        id: product.id, name, url: product.url, isAvailable: true, imageUrl, color: product.color,
        season: product.season, price: product.price, price_prefix, page, date, isNew, tags: product.tags,
        type: 'shoes', sizes
      }
      return shoes
    }
    default: {
      const simpleProduct: SimpleProductProps = {
        id: product.id, name, url: product.url, isAvailable: true, imageUrl, color: product.color,
        season: product.season, price: product.price, price_prefix, page, date, isNew, tags: product.tags,
        type: 'product'
      }
      return simpleProduct
    }
  }
}