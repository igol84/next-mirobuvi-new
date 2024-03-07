import {isShoes, ProductType} from "@/components/Products/types";
import {FilterProductTypeType} from "@/app/[lang]/[urlTag]/types";
import _ from "lodash";

export const filterProductsByMinPrice = (products: ProductType[], minPrice: number): ProductType[] => {
  return products.filter(product => {
    return product.price >= minPrice
  })
}

export const filterProductsByMaxPrice = (products: ProductType[], maxPrice: number): ProductType[] => {
  return products.filter(product => {
    return product.price <= maxPrice
  })
}

export const filterProductsByProductType = (products: ProductType[], productType: FilterProductTypeType): ProductType[] => {
  return products.filter(product => {
    return product.type === productType
  })
}

export const filterProductsBySize = (products: ProductType[], sizes: number[]): ProductType[] => {
  return products.filter(product => {
    if (isShoes(product)) {
      for (const size of sizes) {
        if (product.sizes.includes(size))
          return true
      }
      return false
    }
  })
}

export const filterProductsByTag = (products: ProductType[], tag: string): ProductType[] => {
  return products.filter(product => {
    return _.words(product.tags.toLowerCase()).includes(tag.toLowerCase())
  })
}