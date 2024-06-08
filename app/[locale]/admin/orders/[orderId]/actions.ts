'use server'
import {SafeParseReturnType} from "zod"
import {ErrorEditField, OrderEditFormSchema, Response, schema} from "./types"

import {revalidatePath} from "next/cache"
import {deleteItem, deleteOrder, editItemQuantity, editOrder} from "@/lib/db/order"

export const serverActionEditOrder = async (orderFormData: OrderEditFormSchema): Promise<Response> => {
  const result: SafeParseReturnType<OrderEditFormSchema, OrderEditFormSchema> = schema.safeParse(orderFormData)

  const zodErrors: ErrorEditField[] = []
  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors.push({field: String(issue.path[0]) as keyof OrderEditFormSchema, message: issue.message})
    })
    return {success: false, errors: zodErrors}
  }
  await editOrder(orderFormData)
  revalidatePath("/[locale]/admin/orders", 'page')
  return {success: true}
}

export const serverActionDeleteOrder = async (orderId: number) => {
  await deleteOrder(orderId)
  revalidatePath("/[locale]/admin/orders", 'page')
}

export const serverActionEditItemQuantity = async (productId: number, quantity: number) => {
  const result = await editItemQuantity(productId, quantity)
  revalidatePath("/[locale]/admin/orders", 'page')
  return result
}

export const serverActionDeleteItem = async (productId: number) => {
  const result = await deleteItem(productId)
  revalidatePath("/[locale]/admin/orders", 'page')
  return result
}
