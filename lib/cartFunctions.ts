"use server"
import {ShoppingCart} from "@/lib/db/cart";
import {getProductData} from "@/app/api/fetchFunctions";
import {Lang} from "@/dictionaries/get-dictionary";

export interface ProductCart {
  url: string
  name: string
  type: 'product' | 'shoes'
  price: number
  size: number | null
  quantity: number
  img: string
}

export const getCartData = async (cart: ShoppingCart, lang: Lang): Promise<ProductCart[]> => {
  const cartItems: ProductCart[] = []
  for (let item of cart.items) {
    const product = await getProductData(item.productId)
    if (product) {
      const name = lang==='en' ? product.name : product.name_ua
      const productCart: ProductCart = {
        url: product.url, name, type: product.type,
        price: product.price, size: item.size, quantity: item.quantity, img: product.images[0]
      }
      cartItems.push(productCart)
    }
  }
  return cartItems
}

