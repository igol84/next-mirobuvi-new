'use server'
import {revalidatePath} from "next/cache"
import {changeOrderStatus} from "@/lib/db/order";
import {allStatus, OrderStatusType} from "@/components/base/Status/types";


export const serverActionChangeOrderStatus = async (orderId: number, newStatus: OrderStatusType) => {
  if(allStatus.includes(newStatus)){
    await changeOrderStatus(orderId, newStatus)
    revalidatePath("/[locale]/admin/orders", 'page')
  }
}