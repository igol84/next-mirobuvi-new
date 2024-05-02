import {cache} from 'react'
import {Prisma} from "@prisma/client"
import {prisma} from "@/lib/db/prisma"

export type TagUrl = Prisma.TagUrlGetPayload<{}>
export type CreateTagUrlType = Prisma.TagUrlCreateInput
export type UpdateTagUrlType = Prisma.TagUrlUncheckedUpdateInput

export const getTagUrls = cache(async (): Promise<TagUrl[]> => {
  return await prisma.tagUrl.findMany()
})

export const getTagUrl = cache(async (url: string): Promise<TagUrl | null> => {
  return await prisma.tagUrl.findUnique({
    where: {url}
  })
})

export const createTagUrl = async (data: CreateTagUrlType): Promise<TagUrl> => {
  return await prisma.tagUrl.create({
    data,
  })
}

export const updateTagUrl = async (url: string, data: UpdateTagUrlType): Promise<TagUrl> => {
  return await prisma.tagUrl.update({
    where: {url},
    data,
  })
}

export const deleteTagUrl = async (url: string) => {
  await prisma.tagUrl.delete({
    where: {url}
  })
}