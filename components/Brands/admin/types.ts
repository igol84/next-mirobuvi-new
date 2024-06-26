import {z} from "zod";

export const schema = z.object({
  selectedId: z.number().nullable(),
  id: z.number(),
  orderNumber: z.number(),
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
  active: z.boolean(),
  private: z.boolean(),
  fileImg: z.any()
})

export type BrandFormSchema = z.infer<typeof schema>

export type Response = {
  success: boolean,
  errors?: ErrorField[],
  serverErrors?: string,
}

export type ErrorField = {
  field: keyof BrandFormSchema,
  message: string
}


export const defaultValues: BrandFormSchema = {
  selectedId: null,
  id: 0,
  orderNumber: 0,
  nameUa: "",
  nameEn: "",
  titleUa: "",
  titleEn: "",
  tags: "",
  metaDescEn: "",
  metaDescUa: "",
  url: "",
  textUa: "",
  textEn: "",
  active: true,
  private: false,
  fileImg: null
}