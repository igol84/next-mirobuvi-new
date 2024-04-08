'use server'
import {SafeParseReturnType} from "zod";
import {revalidatePath} from "next/cache";
import {BrandFormSchema, ErrorField, Response, schema} from "@/components/Brands/admin/types";
import {createBrand, CreateBrandType} from "@/lib/db/brand";


export const serverActionCreateNeBrand = async (brandFormData: BrandFormSchema): Promise<Response> => {
  const result: SafeParseReturnType<BrandFormSchema, BrandFormSchema> = schema.safeParse(brandFormData)

  const zodErrors: ErrorField[] = []
  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors.push({field: String(issue.path[0]) as keyof BrandFormSchema, message: issue.message})
    })
    return {success: false, errors: zodErrors}
  }

  const newBrandData: CreateBrandType = {
    name_ua: brandFormData.nameUa,
    name_en: brandFormData.nameEn,
    title_ua: brandFormData.titleUa,
    title_en: brandFormData.titleEn,
    meta_desc_ua: brandFormData.metaDescUa,
    meta_desc_en: brandFormData.metaDescEn,
    text_ua: brandFormData.textUa,
    text_en: brandFormData.textEn,
    url: brandFormData.url,
    tags: brandFormData.tags,
    active: brandFormData.active
  }
  await createBrand(newBrandData)
  revalidatePath("/[lang]/brands")
  return {success: true}
}
