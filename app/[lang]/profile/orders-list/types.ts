export interface IOrderItem {
  productNameUa: string
  productNameEn: string
  price: number
  quantity: number
  size?: number | null
}

export interface IOrder {
  id: number
  orderNumber: number
  createdAt: Date
  orderItems: IOrderItem[]
  status: string
}

