'use server'
import {SafeParseReturnType} from "zod";
import {ErrorField, OrderFormSchema, ProductDetailsByUrl, Response, schema} from "./types";
import {createOrder, OrderCreateInput, OrderItemCreateInput, OrderStatusType} from "@/lib/db/order";
import {revalidatePath} from "next/cache";
import {deleteCart, getCart} from "@/lib/db/cart";
import {getProductByUrl} from "@/lib/db/product";

export const serverAction = async (orderFormData: OrderFormSchema): Promise<Response> => {
  const result: SafeParseReturnType<OrderFormSchema, OrderFormSchema> = schema.safeParse(orderFormData)

  const zodErrors: ErrorField[] = []
  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors.push({field: String(issue.path[0]) as keyof OrderFormSchema, message: issue.message})
    })
    return {success: false, errors: zodErrors}
  }
  const cart = await getCart()
  if (cart && cart.items.length) {
    const productDetailsByUrl: ProductDetailsByUrl = new Map()
    for (const item of cart.items) {
      const productData = await getProductByUrl(item.productId)
      if (productData)
        productDetailsByUrl.set(item.productId,
          {ua: productData.name_ua, en: productData.name_en, price: productData.price}
        )
    }
    const orderItems: OrderItemCreateInput[] = []
    for (const item of cart.items) {
      const productNameEn = productDetailsByUrl.get(item.productId)?.en
      const productNameUa = productDetailsByUrl.get(item.productId)?.ua
      const price = productDetailsByUrl.get(item.productId)?.price
      const orderItem: OrderItemCreateInput = {
        productId: item.productId,
        productNameEn: productNameEn ? productNameEn : '',
        productNameUa: productNameUa ? productNameUa : '',
        size: item.size,
        quantity: item.quantity,
        price: price ? price : 0,
      }
      orderItems.push(orderItem)

    }
    const status: OrderStatusType = "New"

    const orderCreateInput: OrderCreateInput = {
      firstName: orderFormData.firstName,
      lastName: orderFormData.lastName,
      delivery: orderFormData.delivery,
      email: orderFormData.email,
      phone: orderFormData.phone,
      userId: cart.userId,
      status,
      orderItems: {
        create: orderItems
      }
    }
    await createOrder(orderCreateInput)
    await deleteCart(cart.id)
    revalidatePath("/[lang]/profile/orders-list")
    return {success: true}
  }
  return {success: false, serverErrors: 'Cart not defined or empty'}
}