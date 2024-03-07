import {OrderStatusType as StatusType} from "@/lib/db/order";

export interface StatusProps {
  orderId: string
  status: OrderStatusType
}

export type OrderStatusType = StatusType
export const allStatus: OrderStatusType[] = ['New', 'InProgress', 'Done', 'NotDone']