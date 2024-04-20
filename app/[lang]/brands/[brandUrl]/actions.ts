'use server'

import {ErrorField, ProductFormSchema, Response, schema} from "@/components/product/admin/types";
import {SafeParseReturnType} from "zod";
import {
  createProduct,
  CreateProductType,
  getProduct,
  getProductUrls,
  updateProduct,
  UpdateProductType
} from "@/lib/db/product";
import {revalidatePath} from "next/cache";
import {addFiles, getFTPClient, uploadFiles} from "@/lib/ftp";
import {env} from "@/lib/env";
import {convertTextForUrl} from "@/utility/functions";


export const serverActionCreateOrEditProduct = async (formData: FormData): Promise<Response> => {
  const id: number | null = !!formData.get("id") ? Number(formData.get("id")) : null
  const isEditing = !!id
  let allProductUrls = await getProductUrls()
  if(isEditing){
    const oldProductData = await getProduct(id)
    allProductUrls = allProductUrls.filter(url => url !== oldProductData?.url)
  }
  const url = convertTextForUrl(formData.get("url") as string)
  const urlIsConsist = allProductUrls.includes(url)
  if (urlIsConsist) return {success: false, errors: [{field: 'url', message: 'consist'}]}
  const productFormData: ProductFormSchema = {
    id,
    nameUa: formData.get("nameUa") as string,
    nameEn: formData.get("nameEn") as string,
    titleUa: formData.get("titleUa") as string,
    titleEn: formData.get("titleEn") as string,
    tags: formData.get("tags") as string,
    metaDescEn: formData.get("metaDescEn") as string,
    metaDescUa: formData.get("metaDescUa") as string,
    url,
    textUa: formData.get("textUa") as string,
    textEn: formData.get("textEn") as string,
    active: formData.get("active") === 'on',
    private: formData.get("private") === 'on',
    isAvailable: formData.get("isAvailable") === 'on',
    price: Number(formData.get("price")),
    oldPrice: Number(formData.get("oldPrice")),
    promActive: formData.get("promActive") === 'on',
    promAddToId: Number(formData.get("promAddToId")),
    brandId: Number(formData.get("brandId")),
    season: formData.get("season") as string,
    color: formData.get("color") as string,
    filesImg: formData.getAll("filesImg") as File[],
    type: formData.get("type") as string,
  }
  const result: SafeParseReturnType<ProductFormSchema, ProductFormSchema> = schema.safeParse(productFormData)
  const zodErrors: ErrorField[] = []
  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors.push({field: String(issue.path[0]) as keyof ProductFormSchema, message: issue.message})
    })
    return {success: false, errors: zodErrors}
  }
  const productData = result.data
  if(isEditing)
    return editProduct(productData)
  return addNewProduct(productData)

}

const addNewProduct = async (productData: ProductFormSchema): Promise<Response>=> {
  const product: CreateProductType = {
    active: productData.active,
    private: productData.private,
    url: productData.url,
    is_available: productData.isAvailable,
    tags: productData.tags,
    type: productData.type,
    name_en: productData.nameEn,
    name_ua: productData.nameUa,
    title_en: productData.titleEn,
    title_ua: productData.titleUa,
    meta_desc_en: productData.metaDescEn,
    meta_desc_ua: productData.metaDescUa,
    text_en: productData.textEn,
    text_ua: productData.textUa,
    price: productData.price,
    old_price: productData.oldPrice ?? productData.price,
    prom_active: productData.promActive,
    prom_add_to_id: productData.promAddToId,
    season: productData.season,
    color: productData.color,
    brand_id: productData.brandId,
  }
  await createProduct(product)
  try {
    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    const files = productData.filesImg as File[]
    await uploadFiles(ftpClient, `products/${product.url}`, files)
    ftpClient.close()
  } catch {
    return {success: false, serverErrors: 'FTP Error'};
  }
  revalidatePath("/[lang]/brands", 'page')
  return {success: true}
}

const editProduct = async (productData: ProductFormSchema): Promise<Response>=> {
  const product: UpdateProductType  = {
    id: productData.id as number,
    active: productData.active,
    private: productData.private,
    url: productData.url,
    is_available: productData.isAvailable,
    tags: productData.tags,
    type: productData.type,
    name_en: productData.nameEn,
    name_ua: productData.nameUa,
    title_en: productData.titleEn,
    title_ua: productData.titleUa,
    meta_desc_en: productData.metaDescEn,
    meta_desc_ua: productData.metaDescUa,
    text_en: productData.textEn,
    text_ua: productData.textUa,
    price: productData.price,
    old_price: productData.oldPrice ?? productData.price,
    prom_active: productData.promActive,
    prom_add_to_id: productData.promAddToId,
    season: productData.season,
    color: productData.color,
    brand_id: productData.brandId,
  }
  await updateProduct(product)
  try {
    const files = productData.filesImg as File[]
    const isFilesExist = files.length>=1 && files[0].size > 0
    if(isFilesExist) {
      const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
      await addFiles(ftpClient, `products/${product.url}`, files)
      ftpClient.close()
    }
  } catch {
    return {success: false, serverErrors: 'FTP Error'};
  }
  revalidatePath("/[lang]/brands", 'page')
  return {success: true}
}