import {ProductSchema, ProductWithoutDescriptionSchema} from "@/schemas/data";
import {Lang} from "@/dictionaries/get-dictionary";
import {PageType, ProductType} from "@/components/Products/types";
import {dateDiffInDays, DAYS_IS_NEW, formatStringToData} from "@/utility/functions";

interface CreateProduct {
  (
    product: ProductSchema | ProductWithoutDescriptionSchema,
    lang: Lang,
    page?: PageType
  ): ProductType
}

export const createProduct: CreateProduct = (product, lang, page = 'catalog') => {
  const name = lang === 'en' ? product.name : product.name_ua
  const price_prefix = lang === 'en' ? '₴' : 'грн.'
  const date = formatStringToData(product.date)
  const daysInterval = dateDiffInDays(date, new Date())
  const isNew = daysInterval < DAYS_IS_NEW
  switch (product.type) {
    case "product": {
      return {
        id: product.id, name, url: product.url, product_key: product.product_key, qty: product.qty,
        price: product.price, price_prefix, type: 'product', page, date, isNew, tags: product.tags
      }
    }
    case "shoes": {
      const sizes: number[] = product.sizes.map(size => size.size)
      return {
        id: product.id, name, url: product.url, product_key: product.product_key, qty: product.qty,
        price: product.price, price_prefix, type: 'shoes', sizes, page, date, isNew, tags: product.tags
      }
    }
  }
}