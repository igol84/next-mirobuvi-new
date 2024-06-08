'use server'

import {ArticleFormSchema, ErrorField, Response, schema} from "@/components/Articles/admin/types";
import {SafeParseReturnType} from "zod";
import {
  createArticle,
  CreateArticleType,
  deleteArticle,
  editeArticle,
  getArticle,
  getArticles,
  UpdateArticleType
} from "@/lib/db/article";
import {revalidatePath} from "next/cache";


export const serverActionCreateOrEditArticle = async (data: ArticleFormSchema): Promise<Response> => {
  const result: SafeParseReturnType<ArticleFormSchema, ArticleFormSchema> = schema.safeParse(data)
  const zodErrors: ErrorField[] = []
  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors.push({field: String(issue.path[0]) as keyof ArticleFormSchema, message: issue.message})
    })
    return {success: false, errors: zodErrors}
  }
  const articleData = result.data
  const isEditing = articleData.selectedUrl !== null
  if (articleData.selectedUrl !== articleData.url) {
    const oldArticle = await getArticle(articleData.url)
    if (oldArticle) return {success: false, errors: [{field: 'url', message: 'consist'}]}
  }
  let urlList = await getArticles().then(articles => articles.map(article => article.url))
  if (isEditing) {
    urlList = urlList.filter(url => url !== articleData.selectedUrl)
  }
  const urlIsConsist = urlList.includes(articleData.url)
  if (urlIsConsist) return {success: false, errors: [{field: 'url', message: 'consist'}]}

  if (isEditing)
    return editArticle(articleData)
  return addNewArticle(articleData)
}

const addNewArticle = async (articleData: ArticleFormSchema): Promise<Response> => {
  const article: CreateArticleType = {
    url: articleData.url,
    active: articleData.active,
    title_en: articleData.titleEn,
    title_ua: articleData.titleUa,
    desc_en: articleData.metaDescEn,
    desc_ua: articleData.metaDescUa,
    text_en: articleData.textEn,
    text_ua: articleData.textUa,
    img: articleData.img,
  }
  try {
    await createArticle(article)
  } catch {
    return {success: false, serverErrors: 'FTP Error'}
  }
  revalidatePath("/[locale]/articles", 'page')
  return {success: true}
}

const editArticle = async (articleData: ArticleFormSchema): Promise<Response> => {
  const article: UpdateArticleType = {
    url: articleData.url,
    active: articleData.active,
    title_en: articleData.titleEn,
    title_ua: articleData.titleUa,
    desc_en: articleData.metaDescEn,
    desc_ua: articleData.metaDescUa,
    text_en: articleData.textEn,
    text_ua: articleData.textUa,
    img: articleData.img,
  }
  try {
    await editeArticle(articleData.selectedUrl as string, article)
  } catch {
    return {success: false, serverErrors: 'FTP Error'}
  }
  revalidatePath("/[locale]/articles", 'page')
  return {success: true}
}

export const serverActionDeleteArticle = async (articleUrl: string): Promise<Response> => {
  try {
    const article = await getArticle(articleUrl)
    if (!article) return {success: false, serverErrors: 'FTP Error'}
    await deleteArticle(articleUrl)
  } catch {
    return {success: false, serverErrors: 'server Error'}
  }
  revalidatePath("/[locale]/articles", 'page')
  return {success: true}
}