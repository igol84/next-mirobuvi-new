import {z} from "zod";

export const schema = z.object({
  id: z.number(),
  price: z.number(),
})

export type ProductEditorSchema = z.infer<typeof schema>

export type Response = {
  success: boolean,
  errors?: ErrorField[],
  serverErrors?: string,
}

export type ErrorField = {
  field: keyof ProductEditorSchema,
  message: string
}