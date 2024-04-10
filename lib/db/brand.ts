import {cache} from 'react'
import {Prisma} from "@prisma/client";
import {prisma} from "@/lib/db/prisma";

export type BrandDBType = Prisma.BrandGetPayload<{}>
export type CreateBrandType = Prisma.BrandCreateInput

export const getBrands = cache(async (): Promise<BrandDBType[]> => {
  return await prisma.brand.findMany()
})

export const getBrand = cache(async (brandId: number): Promise<BrandDBType | null> => {
  return await prisma.brand.findUnique({
    where: {id: brandId}
  })
})

export const createBrand = async (data: CreateBrandType): Promise<BrandDBType> => {
  return await prisma.brand.create({
    data
  })
}