'use server'
import {revalidatePath} from "next/cache"
import {moveItemToAnotherOrder} from "@/lib/db/order";


export const serverActionMoveProductToAnotherOrder = async (itemId: number, orderId: number) => {
  const result = await moveItemToAnotherOrder(itemId, orderId)
  revalidatePath("/[locale]/admin/orders")
  return result
}
