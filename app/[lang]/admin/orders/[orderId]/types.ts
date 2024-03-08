import {z} from "zod";

export interface IOrderItem {
  productId: number
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

export const schema = z.object({
  id: z.number(),
  firstName: z.string().trim()
    .min(2, 'gt2')
    .max(16, 'lt16'),
  lastName: z.string().trim()
    .min(2, 'gt2')
    .max(16, 'lt16'),
  phone: z.string().trim().length(9, 'l9'),
  email: z.string().trim().email('invalidEmail').or(z.literal('')),
  delivery: z.string().trim()
})

export type OrderEditFormSchema = z.infer<typeof schema>

export type Response = {
  success: boolean,
  errors?: ErrorEditField[],
  serverErrors?: string,
}

export type ErrorEditField = {
  field: keyof OrderEditFormSchema,
  message: string
}


