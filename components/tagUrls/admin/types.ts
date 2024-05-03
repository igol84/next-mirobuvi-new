import {z} from "zod";

export const schema = z.object({
  selectedUrl: z.string().optional(),
  url: z.string().min(2, 'gt2'),
  parent: z.string(),
  orderNumber: z.number().nonnegative(),
  searchEn: z.string(),
  searchUa: z.string(),
  titleEn: z.string(),
  titleUa: z.string(),
  descEn: z.string(),
  descUa: z.string(),
  textEn: z.string(),
  textUa: z.string(),
})

export type TagUrlsFormSchema = z.infer<typeof schema>
export type TagUrlsFormEditSchema = TagUrlsFormSchema & {selectedUrl: string}

export type Response = {
  success: boolean,
  errors?: ErrorField[],
  serverErrors?: string,
}

export type ErrorField = {
  field: keyof TagUrlsFormSchema,
  message: string
}

export const defaultValues: TagUrlsFormSchema = {
  url: '',
  parent: '',
  orderNumber: 0,
  searchEn: '',
  searchUa: '',
  titleEn: '',
  titleUa: '',
  descEn: '',
  descUa: '',
  textEn: '',
  textUa: '',
}
