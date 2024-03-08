export interface StatusProps {
  orderId: number
  status: string
}

export type OrderStatusType = string
export const allStatus: OrderStatusType[] = ['New', 'InProgress', 'Done', 'NotDone']