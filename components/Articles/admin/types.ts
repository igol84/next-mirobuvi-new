import {z} from "zod";

export const schema = z.object({
  selectedUrl: z.string().nullable(),
  url: z.string().trim().min(2, 'gt2'),
  titleUa: z.string().trim(),
  titleEn: z.string().trim(),
  metaDescUa: z.string().trim(),
  metaDescEn: z.string().trim(),
  textUa: z.string().trim(),
  textEn: z.string().trim(),
  active: z.boolean(),
  img: z.string().trim()
})

export type ArticleFormSchema = z.infer<typeof schema>

export type Response = {
  success: boolean,
  errors?: ErrorField[],
  serverErrors?: string,
}

export type ErrorField = {
  field: keyof ArticleFormSchema,
  message: string
}


export const defaultValues: ArticleFormSchema = {
  selectedUrl: null,
  url: '',
  titleUa: '',
  titleEn: '',
  metaDescUa: '',
  metaDescEn: '',
  textUa: '',
  textEn: '',
  active: true,
  img: ''
}