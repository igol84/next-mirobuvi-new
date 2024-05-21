'use server'

import {ErrorField, ProductFormSchema, Response, schema} from "@/components/product/admin/types";
import {SafeParseReturnType} from "zod";
import {
  createProduct,
  CreateProductType,
  deleteProduct,
  getProduct,
  getProductUrls,
  updateProduct,
  UpdateProductType
} from "@/lib/db/product";
import {revalidatePath} from "next/cache";
import {addFiles, deleteImage, getAllImages, getFTPClient, renameFolder, renameImages, uploadFiles} from "@/lib/ftp";
import {env} from "@/lib/env";
import {convertTextForUrl} from "@/utility/functions";
import {Image} from "@/components/product/admin/ProductImage";
import {SizeType} from "@/components/product/admin/shoes/types";
import {getProductImageUrl} from "@/lib/productCardData";


export const serverActionCreateOrEditProduct = async (formData: FormData): Promise<Response> => {
  const selectedId: number | null = !!formData.get("selectedId") ? Number(formData.get("selectedId")) : null
  const id = Number(formData.get("id"))
  if (selectedId !== id) {
    const oldProductData = await getProduct(id)
    if (oldProductData) return {success: false, errors: [{field: 'id', message: 'consist'}]}
  }
  const isEditing = !!selectedId
  let allProductUrls = await getProductUrls()
  if (isEditing) {
    const oldProductData = await getProduct(selectedId)
    allProductUrls = allProductUrls.filter(url => url !== oldProductData?.url)
  }
  const url = convertTextForUrl(formData.get("url") as string)
  const urlIsConsist = allProductUrls.includes(url)
  if (urlIsConsist) return {success: false, errors: [{field: 'url', message: 'consist'}]}
  const productFormData: ProductFormSchema = {
    selectedId,
    id,
    nameUa: formData.get("nameUa") as string,
    nameEn: formData.get("nameEn") as string,
    nameRu: formData.get("nameRu") as string,
    titleUa: formData.get("titleUa") as string,
    titleEn: formData.get("titleEn") as string,
    tags: formData.get("tags") as string,
    metaDescEn: formData.get("metaDescEn") as string,
    metaDescUa: formData.get("metaDescUa") as string,
    url,
    textUa: formData.get("textUa") as string,
    textEn: formData.get("textEn") as string,
    textRu: formData.get("textRu") as string,
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
  let shoes = JSON.parse(String(formData.get("shoes"))) as SizeType[]
  const addedShoes: SizeType[] = []
  for (const shoe of shoes) {
    if (!addedShoes.map(shoes => shoes.size).includes(shoe.size) && shoe.size > 0 && shoe.length > 0) {
      addedShoes.push(shoe)
    }
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
  if (isEditing)
    return editProduct(selectedId, productData, addedShoes)
  return addNewProduct(productData, addedShoes)
}

const addNewProduct = async (productData: ProductFormSchema, shoes: SizeType[]): Promise<Response> => {
  try {
    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    const files = productData.filesImg as File[]
    await uploadFiles(ftpClient, `products/${productData.url}`, files)
    const imagesNames = await getAllImages(ftpClient, `products/${productData.url}`)
    const imgCount = imagesNames.length
    ftpClient.close()
    const product: CreateProductType = {
      id: productData.id,
      active: productData.active,
      private: productData.private,
      url: productData.url,
      is_available: productData.isAvailable,
      tags: productData.tags,
      type: productData.type,
      name_en: productData.nameEn,
      name_ua: productData.nameUa,
      name_ru: productData.nameRu,
      title_en: productData.titleEn,
      title_ua: productData.titleUa,
      meta_desc_en: productData.metaDescEn,
      meta_desc_ua: productData.metaDescUa,
      text_en: productData.textEn,
      text_ua: productData.textUa,
      text_ru: productData.textRu,
      price: productData.price,
      old_price: productData.oldPrice ?? productData.price,
      prom_active: productData.promActive,
      prom_add_to_id: productData.promAddToId,
      season: productData.season,
      color: productData.color,
      brand_id: productData.brandId,
      imgCount
    }
    await createProduct(product, shoes)
  } catch {
    return {success: false, serverErrors: 'FTP Error'};
  }

  revalidatePath("/[lang]/brands", 'page')
  return {success: true}
}

const editProduct = async (selectedId: number, productData: ProductFormSchema, shoes: SizeType[]): Promise<Response> => {

  let isFileEdited = false
  const oldProduct = await getProduct(productData.id as number)
  let imgCount = oldProduct?.imgCount as number
  const urlIsChanged = oldProduct?.url !== productData.url

  if (urlIsChanged) {
    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    await renameFolder(ftpClient, 'products', oldProduct?.url as string, productData.url as string)
    ftpClient.close()
  }

  const files = productData.filesImg as File[]
  const isFilesExist = files.length >= 1 && files[0].size > 0
  if (isFilesExist) {
    try {
      const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
      await addFiles(ftpClient, `products/${productData.url}`, files)
      const imagesNames = await getAllImages(ftpClient, `products/${productData.url}`)
      imgCount = imagesNames.length
      ftpClient.close()
      isFileEdited = true
    } catch {
      return {success: false, serverErrors: 'FTP Error'};
    }
  }

  let product: UpdateProductType = {
    id: productData.id as number,
    active: productData.active,
    private: productData.private,
    url: productData.url,
    is_available: productData.isAvailable,
    tags: productData.tags,
    type: productData.type,
    name_en: productData.nameEn,
    name_ua: productData.nameUa,
    name_ru: productData.nameRu,
    title_en: productData.titleEn,
    title_ua: productData.titleUa,
    meta_desc_en: productData.metaDescEn,
    meta_desc_ua: productData.metaDescUa,
    text_en: productData.textEn,
    text_ua: productData.textUa,
    text_ru: productData.textRu,
    price: productData.price,
    old_price: productData.oldPrice ?? productData.price,
    prom_active: productData.promActive,
    prom_add_to_id: productData.promAddToId,
    season: productData.season,
    color: productData.color,
    brand_id: productData.brandId,
  }
  if (isFileEdited) {
    product = {...product, imgUpdatedAt: new Date(), imgCount}
  }
  await updateProduct(selectedId, product, shoes)
  revalidatePath("/[lang]/brands", 'page')
  return {success: true}
}

type ServerActionRenameImages = {
  (id: number, productName: string, names: string[]): Promise<Image[]>
}

export const serverActionRenameImages: ServerActionRenameImages = async (id, productName, names) => {
  const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
  await renameImages(ftpClient, `products/${productName}`, names)
  ftpClient.close()
  const updatedProduct = await updateProduct(id, {imgUpdatedAt: new Date()})
  const dateUpdate = updatedProduct.imgUpdatedAt?.getTime()
  const response: Image[] = names.map((_, index) => {
    const name = `${index + 1}.jpeg`
    const url = getProductImageUrl(productName, dateUpdate, name)
    return {name, url}
  })
  revalidatePath("/[lang]/products/[productUrl]/edit", 'page')
  return response
}

type ServerActionDeleteImage = {
  (
    id: number,
    prodUrl: string,
    delName: string,
    names: string[]
  ): Promise<Image[] | null>
}

export const serverActionDeleteImage: ServerActionDeleteImage = async (id, prodUrl, delName, names) => {
  try {
    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    await deleteImage(ftpClient, `products/${prodUrl}`, delName, names)
    ftpClient.close()
    const updatedProduct = await updateProduct(id, {imgUpdatedAt: new Date()})
    const dateUpdate = updatedProduct.imgUpdatedAt?.getTime()
    const newNames = names.filter(name => name !== delName).sort()
    const response: Image[] = newNames.map((_, index) => {
      const name = `${index + 1}.jpeg`
      const url = getProductImageUrl(prodUrl, dateUpdate, name)
      return {name, url}
    })
    revalidatePath("/[lang]/products/[productUrl]/edit", 'page')
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

export const serverActionDeleteProduct = async (id: number): Promise<Response> => {
  try {
    const product = await getProduct(id)
    if (!product) {
      return {success: false, serverErrors: 'DB Product dont find'}
    }
    await deleteProduct(id)
    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    await ftpClient.removeDir(`products/${product.url}`)
    ftpClient.close()
    revalidatePath("/[lang]/products", 'page')
    revalidatePath("/[lang]/brands/[productUrl]", 'page')
    return {success: true}
  } catch (err) {
    console.error(err)
    return {success: false, serverErrors: 'server Error'}
  }
}