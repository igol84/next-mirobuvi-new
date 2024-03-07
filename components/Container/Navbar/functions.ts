'use client'
import {ProductCart} from "@/lib/cartFunctions";

export interface TotalData {
  count: number
  total: number
}



export const getCartProductsCount = (cartProducts: ProductCart[]): TotalData => {
  const count = cartProducts.reduce((accumulator, currentValue) => currentValue.quantity + accumulator, 0)
  const totalFunction = (accumulator: number, currentValue: ProductCart) => {
    return currentValue.quantity * currentValue.price + accumulator
  }
  const total = cartProducts.reduce(totalFunction, 0)
  return {count, total}
}