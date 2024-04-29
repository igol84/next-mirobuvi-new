"use server"
import {ShoppingCart} from "@/lib/db/cart";
import {Lang} from "@/dictionaries/get-dictionary";
import {getProductByUrl} from "@/lib/db/product";
import {env} from "@/lib/env";

export interface ProductCart {
  url: string
  name: string
  type: string
  price: number
  size: number | null
  quantity: number
  img: string
}

export const getCartData = async (cart: ShoppingCart, lang: Lang): Promise<ProductCart[]> => {
  const cartItems: ProductCart[] = []
  for (let item of cart.items) {
    const product = await getProductByUrl(item.productId)
    if (product) {
      const name = lang==='en' ? product.name_en : product.name_ua
      const img = `${env.FTP_URL}/products/${product.url}/1.jpeg?key=${product.imgUpdatedAt?.getTime()}`
      const productCart: ProductCart = {
        url: product.url, name, type: product.type,
        price: product.price, size: item.size, quantity: item.quantity, img
      }
      cartItems.push(productCart)
    }
  }
  return cartItems
}

