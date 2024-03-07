import {z} from "zod";

export interface OrderFormProps{
  isAuthorized: boolean
  isCarNotEmpty: boolean
}

export const schema = z.object({
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

export type OrderFormSchema = z.infer<typeof schema>

export type Response = {
  success: boolean,
  errors?: ErrorField[],
  serverErrors?: string,
}

export type ErrorField = {
  field: keyof OrderFormSchema,
  message: string
}


export type ProductDetailsByUrl = Map<string, {ua: string, en: string, price: number, url?: string}>