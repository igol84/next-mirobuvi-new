'use server'
import {SafeParseReturnType} from "zod";
import {revalidatePath} from "next/cache";
import {BrandFormSchema, ErrorField, Response, schema} from "@/components/Brands/admin/types";
import {createBrand, CreateBrandType} from "@/lib/db/brand";
import {convertTextForUrl} from "@/utility/functions";
import {getFTPClient, uploadFile} from "@/lib/ftp";
import {env} from "@/lib/env";


export const serverActionCreateNewBrand = async (brandFormData: FormData): Promise<Response> => {

  const brandData: BrandFormSchema = {
    nameUa: brandFormData.get("nameUa") as string,
    nameEn: brandFormData.get("nameEn") as string,
    titleUa: brandFormData.get("titleUa") as string,
    titleEn: brandFormData.get("titleEn") as string,
    tags: brandFormData.get("tags") as string,
    metaDescEn: brandFormData.get("metaDescEn") as string,
    metaDescUa: brandFormData.get("metaDescUa") as string,
    url: brandFormData.get("url") as string,
    textUa: brandFormData.get("textUa") as string,
    textEn: brandFormData.get("textEn") as string,
    active: brandFormData.get("active") === 'on',
    fileImg: brandFormData.get("fileImg") as File,
  }

  const result: SafeParseReturnType<BrandFormSchema, BrandFormSchema> = schema.safeParse(brandData)
  const zodErrors: ErrorField[] = []
  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors.push({field: String(issue.path[0]) as keyof BrandFormSchema, message: issue.message})
    })
    return {success: false, errors: zodErrors}
  }

  const newBrandData: CreateBrandType = {
    name_ua: result.data.nameUa,
    name_en: result.data.nameEn,
    title_ua: result.data.titleUa,
    title_en: result.data.titleEn,
    meta_desc_ua: result.data.metaDescUa,
    meta_desc_en: result.data.metaDescEn,
    text_ua: result.data.textUa,
    text_en: result.data.textEn,
    url: convertTextForUrl(result.data.url),
    tags: result.data.tags,
    active: result.data.active
  }
  const newBrand = await createBrand(newBrandData)
  if(!newBrand){
    return {success: false, serverErrors: 'DB Error'};
  }

  try {
    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    await uploadFile(ftpClient, "brands", result.data.fileImg as File, newBrandData.url)
    ftpClient.close()
  } catch {
    return {success: false, serverErrors: 'FTP Error'};
  }
  revalidatePath("/[lang]/brands")
  return {success: true}
}
