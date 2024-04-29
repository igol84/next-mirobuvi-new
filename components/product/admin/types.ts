import {z} from "zod";
import {allColors, allSeasons} from "@/app/[lang]/[urlTag]/types";

export const productTypes: [string, ...string[]] = ['product', 'shoes']
export const seasons: [string, ...string[]] = ['none', ...allSeasons]
export const colors: [string, ...string[]] = ['none', ...allColors]

export const schema = z.object({
  id: z.number().nullable(),
  nameUa: z.string().trim().min(2, 'gt2'),
  nameEn: z.string().trim().min(2, 'gt2'),
  titleUa: z.string().trim(),
  titleEn: z.string().trim(),
  metaDescUa: z.string().trim(),
  metaDescEn: z.string().trim(),
  tags: z.string().trim(),
  url: z.string().trim().min(2, 'gt2'),
  textUa: z.string().trim(),
  textEn: z.string().trim(),
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
  id: null,
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