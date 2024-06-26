import {ProductWithDetailsDBType} from "@/lib/db/product";

export const isAvailable = (product: ProductWithDetailsDBType) => {
  if (product.active) {
    if (product.type === 'product') return true
    if (product.type === 'shoes') {
      if (product.shoeses.filter(shoes => shoes.is_available).length > 0) {
        return true
      }
    }
  }
  return false
}