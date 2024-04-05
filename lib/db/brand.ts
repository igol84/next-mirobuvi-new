import {cache} from 'react'
import {Prisma} from "@prisma/client";
import {prisma} from "@/lib/db/prisma";
import {revalidatePath} from "next/cache";

export type BrandDBType = Prisma.BrandGetPayload<{}>
export type CreateBrandType = Prisma.BrandCreateInput

export const getBrands = cache(async (): Promise<BrandDBType[]> => {
  return await prisma.brand.findMany()
})

export const createBrand = async (data: CreateBrandType) => {
  await prisma.brand.create({
    data
  })
  revalidatePath('/[lang]/brands')
}