import {OrderStatusType} from "@/components/base/Status/types";

export interface IOrderItem {
  productNameUa: string
  productNameEn: string
  price: number
  quantity: number
  size?: number | null
}

export interface IOrder {
  id: string
  orderNumber: number
  createdAt: Date
  orderItems: IOrderItem[]
  status: OrderStatusType
}

