'use server'
import {revalidatePath} from "next/cache"
import {moveItemToAnotherOrder} from "@/lib/db/order";


export const serverActionMoveProductToAnotherOrder = async (productId: string, orderId: string) => {
  const result = await moveItemToAnotherOrder(productId, orderId)
  revalidatePath("/[lang]/admin/orders")
  return result
}
