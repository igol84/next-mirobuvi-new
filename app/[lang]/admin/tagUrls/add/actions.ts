'use server'
import {ErrorField, Response, schema, TagUrlsFormSchema} from "@/components/tagUrls/admin/types";
import {SafeParseReturnType} from "zod";
import {createTagUrl, CreateTagUrlType, deleteTagUrl, getTagUrl, updateTagUrl, UpdateTagUrlType} from "@/lib/db/tagUrl";
import {revalidatePath} from "next/cache";


export const serverActionTagUrl = async (TagUrlForm: TagUrlsFormSchema): Promise<Response> => {
  const isEditing = !!TagUrlForm.selectedUrl
  const result: SafeParseReturnType<TagUrlsFormSchema, TagUrlsFormSchema> = schema.safeParse(TagUrlForm)
  const zodErrors: ErrorField[] = []
  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors.push({field: String(issue.path[0]) as keyof TagUrlsFormSchema, message: issue.message})
    })
    return {success: false, errors: zodErrors}
  }
  const tagUrl = result.data
  if(isEditing)
    return await editeTagUrl(tagUrl)
  return await createNewTagUrl(tagUrl)
}

const createNewTagUrl = async (tagUrl: TagUrlsFormSchema): Promise<Response> => {
  const existTagUrl = await getTagUrl(tagUrl.url)
  if (existTagUrl)
    return {success: false, errors: [{field: 'url', message: 'exist'}]}
  const tagUrlRow: CreateTagUrlType = {
    url: tagUrl.url,
    parent: tagUrl.parent,
    order_number: tagUrl.orderNumber,
    search_en: tagUrl.searchEn,
    search_ua: tagUrl.searchUa,
    desc_en: tagUrl.descEn,
    desc_ua: tagUrl.descUa,
    text_en: tagUrl.textEn,
    text_ua: tagUrl.textUa
  }
  const newTagUrl = await createTagUrl(tagUrlRow)
  revalidatePath("/[lang]/admin/tagUrls", 'page')
  if (!newTagUrl) {
    return {success: false, errors: [{field: 'descUa', message: 'db error'}]}
  }
  return {success: true}
}

const editeTagUrl = async (tagUrl: TagUrlsFormSchema): Promise<Response> => {
  if(tagUrl.url!==tagUrl.selectedUrl) {
    const existTagUrl = await getTagUrl(tagUrl.url)
    if (existTagUrl)
      return {success: false, errors: [{field: 'url', message: 'exist'}]}
  }
  const tagUrlRow: UpdateTagUrlType = {
    url: tagUrl.url,
    parent: tagUrl.parent,
    order_number: tagUrl.orderNumber,
    search_en: tagUrl.searchEn,
    search_ua: tagUrl.searchUa,
    desc_en: tagUrl.descEn,
    desc_ua: tagUrl.descUa,
    text_en: tagUrl.textEn,
    text_ua: tagUrl.textUa
  }
  console.log(tagUrl.selectedUrl, tagUrlRow)
  await updateTagUrl(tagUrl.selectedUrl!, tagUrlRow)
  revalidatePath("/[lang]/admin/tagUrls", 'page')
  return {success: true}
}
export const serverActionDeleteTagUrl = async (url:string) =>{
  await deleteTagUrl(url)
  revalidatePath("/[lang]/admin/tagUrls", 'page')
}