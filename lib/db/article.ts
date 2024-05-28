import {cache} from 'react'
import {Prisma} from "@prisma/client"
import {prisma} from "@/lib/db/prisma"


export type Article = Prisma.ArticleGetPayload<{}>
export type CreateArticleType = Prisma.ArticleCreateInput
export type UpdateArticleType = Prisma.ArticleUncheckedUpdateInput

export const getArticles = cache(async (): Promise<Article[]> => {
  return await prisma.article.findMany()
})

export const getArticle = cache(async (url: string): Promise<Article | null> => {
  return await prisma.article.findUnique({
    where: {url}
  })
})

export const createArticle = async (data: CreateArticleType): Promise<Article> => {
  return await prisma.article.create({
    data
  })
}
export const editeArticle = async (url: string, data: UpdateArticleType): Promise<Article> => {
  return await prisma.article.update({
    where: {url},
    data: data
  })
}
export const deleteArticle = async (url: string) => {
  await prisma.article.delete({
    where: {url}
  })
}

