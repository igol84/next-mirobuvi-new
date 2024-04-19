import {z} from "zod";

export const productTypes: [string, ...string[]] = ['product', 'shoes']
export const seasons: [string, ...string[]] = ['winter', 'autumn', 'summer']
export const colors: [string, ...string[]] = ['white', 'black', 'red', 'yellow', 'green', 'blue', 'purple', 'orange']

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
  nameUa: "sd",
  nameEn: "sd",
  titleUa: "sd",
  titleEn: "sd",
  tags: "",
  metaDescEn: "",
  metaDescUa: "",
  url: "nike95",
  textUa: "",
  textEn: "",
  active: true,
  isAvailable: true,
  private: false,
  type: "product",
  season: "autumn",
  color: "red",
  price: 100,
  oldPrice: null,
  promActive: false,
  promAddToId: 0,
  brandId: 0
}

export type DefaultValues = typeof defaultValues