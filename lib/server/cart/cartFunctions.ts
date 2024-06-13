"use server"
import {ShoppingCart} from "@/lib/db/cart";
import {getProductByUrl} from "@/lib/db/product";
import {getProductImageUrl} from "@/lib/productCardData";
import {Locale} from "@/i18n";
import {countPrice} from "@/utility/functions";

export interface ProductCart {
  url: string
  name: string
  type: string
  price: number
  size: number | null
  quantity: number
  img: string
}

export const getCartData = async (cart: ShoppingCart, locale: Locale): Promise<ProductCart[]> => {
  const cartItems: ProductCart[] = []
  for (let item of cart.items) {
    const product = await getProductByUrl(item.productId)
    if (product) {
      const name = locale === 'en' ? product.name_en : product.name_ua
      const price = countPrice(product.price, product.discount)
      const img = getProductImageUrl(product.url, product.imgUpdatedAt?.getTime())
      const productCart: ProductCart = {
        url: product.url, name, type: product.type,
        price, size: item.size, quantity: item.quantity, img
      }
      cartItems.push(productCart)
    }
  }
  return cartItems
}

