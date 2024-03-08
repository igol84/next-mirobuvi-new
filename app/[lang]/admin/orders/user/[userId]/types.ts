export interface IOrderItem {
  id: number
  productNameUa: string
  productNameEn: string
  size: number | null
  price: number
  quantity: number
  url: string
  imgUrl: string
}

export interface IOrder {
  id: number
  userId: number | null
  orderNumber: number
  createdAt: Date
  firstName: string
  lastName: string
  email: string
  phone: string
  delivery: string
  orderItems: IOrderItem[]
  status: string
}

export interface IUser {
  id: number
  name: string | null
  email: string | null
  image: string | null
  orders: IOrder[]
}

export interface IDroppableOrder {
  productIds: number[]
}