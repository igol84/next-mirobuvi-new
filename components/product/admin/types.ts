import {z} from "zod";
import {allColors, allSeasons} from "@/app/[lang]/[urlTag]/types";

export const productTypes: [string, ...string[]] = ['product', 'shoes']
export const seasons: [string, ...string[]] = ['none', ...allSeasons]
export const colors: [string, ...string[]] = ['none', ...allColors]

export const schema = z.object({
  selectedId: z.number().nullable(),
  id: z.number(),
  nameUa: z.string().trim().min(2, 'gt2'),
  nameRu: z.string().trim().min(2, 'gt2'),
  nameEn: z.string().trim().min(2, 'gt2'),
  titleUa: z.string().trim(),
  titleEn: z.string().trim(),
  metaDescUa: z.string().trim(),
  metaDescEn: z.string().trim(),
  tags: z.string().trim(),
  url: z.string().trim().min(2, 'gt2'),
  textUa: z.string().trim(),
  textEn: z.string().trim(),
  textRu: z.string().trim(),
  active: z.boolean(),
  private: z.boolean(),
  isAvailable: z.boolean(),
  price: z.number(),
  oldPrice: z.number().nullable(),
  promActive: z.boolean(),
  promAddToId: z.number(),
  season: z.enum(seasons),
  color: z.enum(colors),
  filesImg: z.any(),
  type: z.enum(productTypes),
  brandId: z.number(),
})

export type ProductFormSchema = z.infer<typeof schema>

export type Response = {
  success: boolean,
  errors?: ErrorField[],
  serverErrors?: string,
}

export type ErrorField = {
  field: keyof ProductFormSchema,
  message: string
}


export const defaultValues: Omit<ProductFormSchema, 'filesImg'> = {
  selectedId: null,
  id: 0,
  nameUa: "",
  nameEn: "",
  nameRu: "",
  titleUa: "",
  titleEn: "",
  tags: "Men's sneakers Чоловічі кросівки Women's sneakers Жіночі кросівки",
  metaDescEn: "",
  metaDescUa: "",
  url: "",
  textUa: "",
  textEn: "",
  textRu: "",
  active: true,
  isAvailable: true,
  private: false,
  type: "shoes",
  season: "none",
  color: "none",
  price: 100,
  oldPrice: null,
  promActive: true,
  promAddToId: 0,
  brandId: 0
}

export type DefaultValues = typeof defaultValues

export type BrandType = {
  id: number
  name: string
  url: string
}