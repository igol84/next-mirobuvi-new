'use server'
import {SafeParseReturnType} from "zod";
import {revalidatePath} from "next/cache";
import {BrandFormSchema, ErrorField, Response, schema} from "@/components/Brands/admin/types";
import {
  createBrand,
  CreateBrandType,
  deleteBrand,
  editeBrand,
  getBrand,
  getBrandUrls,
  getBrandWithProducts,
  UpdateBrandType
} from "@/lib/db/brand";
import {convertTextForUrl} from "@/utility/functions";
import {deleteFile, getFTPClient, renameFile, uploadFile} from "@/lib/ftp";
import {env} from "@/lib/env";


export const serverActionCreateOrEditBrand = async (brandFormData: FormData): Promise<Response> => {
  const selectedId: number | null = !!brandFormData.get("selectedId") ? Number(brandFormData.get("selectedId")) : null
  const id = Number(brandFormData.get("id"))
  if (selectedId !== id) {
    const oldBrandData = await getBrand(id)
    if (oldBrandData) return {success: false, errors: [{field: 'id', message: 'consist'}]}
  }
  const isEditing = !!selectedId
  let urlsList = await getBrandUrls()
  const url = convertTextForUrl(brandFormData.get("url") as string)
  if (isEditing) {
    const oldPBrandData = await getBrand(selectedId)
    urlsList = urlsList.filter(url => url !== oldPBrandData?.url)
  }
  const urlIsConsist = urlsList.includes(url)
  if (urlIsConsist) return {success: false, errors: [{field: 'url', message: 'consist'}]}
  const brandData: BrandFormSchema = {
    selectedId,
    id,
    orderNumber: Number(brandFormData.get("orderNumber")),
    nameUa: brandFormData.get("nameUa") as string,
    nameEn: brandFormData.get("nameEn") as string,
    titleUa: brandFormData.get("titleUa") as string,
    titleEn: brandFormData.get("titleEn") as string,
    tags: brandFormData.get("tags") as string,
    metaDescEn: brandFormData.get("metaDescEn") as string,
    metaDescUa: brandFormData.get("metaDescUa") as string,
    url,
    textUa: brandFormData.get("textUa") as string,
    textEn: brandFormData.get("textEn") as string,
    active: brandFormData.get("active") === 'on',
    private: brandFormData.get("private") === 'on',
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

  if (isEditing)
    return await editBrand(selectedId, result.data)
  return await createNewBrand(result.data)

}

const createNewBrand = async (brandData: BrandFormSchema) => {
  const newBrandData: CreateBrandType = {
    id: brandData.id,
    order_number: brandData.orderNumber,
    name_ua: brandData.nameUa,
    name_en: brandData.nameEn,
    title_ua: brandData.titleUa,
    title_en: brandData.titleEn,
    meta_desc_ua: brandData.metaDescUa,
    meta_desc_en: brandData.metaDescEn,
    text_ua: brandData.textUa,
    text_en: brandData.textEn,
    url: brandData.url,
    tags: brandData.tags,
    active: brandData.active,
    private: brandData.private
  }
  const newBrand = await createBrand(newBrandData)
  if (!newBrand) {
    return {success: false, serverErrors: 'DB Error'};
  }

  try {
    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    await uploadFile(ftpClient, "brands", brandData.fileImg as File, newBrandData.url)
    ftpClient.close()
  } catch {
    return {success: false, serverErrors: 'FTP Error'};
  }
  revalidatePath("/[lang]/brands")
  return {success: true}
}

const editBrand = async (selectedId: number, brandFormData: BrandFormSchema) => {
  const oldBrandData = await getBrand(brandFormData.selectedId as number)
  const brandData: UpdateBrandType = {
    id: brandFormData.id as number,
    order_number: brandFormData.orderNumber,
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
    active: brandFormData.active,
    private: brandFormData.private
  }
  const allUrlsList = await getBrandUrls()
  const urlsList = allUrlsList.filter(url => url !== oldBrandData?.url)
  const urlIsConsist = urlsList.includes(brandData.url)
  if (urlIsConsist) {
    const response: Response = {success: false, errors: [{field: 'url', message: 'consist'}]}
    return response
  }
  const brand = await editeBrand(selectedId, brandData)
  if (!brand) {
    return {success: false, serverErrors: 'DB Error'};
  }
  const oldImgName = oldBrandData?.url as string
  const imgName = brand?.url as string
  try {
    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    const fileName = `${oldImgName}.jpeg`
    const newFileName = `${imgName}.jpeg`
    await renameFile(ftpClient, "brands", fileName, newFileName)
    const file = brandFormData.fileImg as File
    if (file.size)
      await uploadFile(ftpClient, "brands", brandFormData.fileImg as File, imgName)
    ftpClient.close()
  } catch {
    return {success: false, serverErrors: 'FTP Error'};
  }
  revalidatePath("/[lang]/brands", 'page')
  return {success: true}
}

export const serverActionDeleteBrand = async (brandId: number): Promise<Response> => {
  try {
    const brandData = await getBrandWithProducts(brandId)
    if (!brandData) {
      return {success: false, serverErrors: 'DB Brand dont find'};
    }
    if (brandData.products.length > 0) {
      return {success: false, serverErrors: 'Products Exist'};
    }
    await deleteBrand(brandId)

    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    const fileName = `${brandData.url}.jpeg`
    await deleteFile(ftpClient, "brands", fileName)
  } catch {
    return {success: false, serverErrors: 'server Error'}
  }
  revalidatePath("/[lang]/brands", 'page')
  return {success: true}


}
