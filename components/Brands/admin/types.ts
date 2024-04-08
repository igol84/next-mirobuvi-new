import {z} from "zod";

export const schema = z.object({
  nameUa: z.string().trim().min(2, 'gt2'),
  nameEn: z.string().trim().min(2, 'gt2'),
  titleUa: z.string().trim(),
  titleEn: z.string().trim(),
  tags: z.string().trim(),
  metaDescUa: z.string().trim(),
  metaDescEn: z.string().trim(),
  url: z.string().trim().min(2, 'gt2'),
  textUa: z.string().trim(),
  textEn: z.string().trim(),
  active: z.string().trim(),
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