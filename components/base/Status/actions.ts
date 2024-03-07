'use server'
import {revalidatePath} from "next/cache"
import {changeOrderStatus} from "@/lib/db/order";
import {allStatus, OrderStatusType} from "@/components/base/Status/types";


export const serverActionChangeOrderStatus = async (orderId: string, newStatus: OrderStatusType) => {
  if(allStatus.includes(newStatus)){
    await changeOrderStatus(orderId, newStatus)
    revalidatePath("/[lang]/admin/orders", 'page')
  }
}