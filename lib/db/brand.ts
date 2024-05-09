import {cache} from 'react'
import {Prisma} from "@prisma/client";
import {prisma} from "@/lib/db/prisma";

export type BrandDBType = Prisma.BrandGetPayload<{}>
export type BrandDBWithProductsType = Prisma.BrandGetPayload<{ include: { products: { include: { shoeses: true } } } }>
export type UpdateBrandType = Prisma.BrandUncheckedCreateInput
export type CreateBrandType = Prisma.BrandCreateInput & { id: number }

export const getBrands = cache(async (): Promise<BrandDBType[]> => {
  return await prisma.brand.findMany()
})

export const getBrand = cache(async (brandId: number): Promise<BrandDBType | null> => {
  return await prisma.brand.findUnique({
    where: {id: brandId}
  })
})

export const getBrandNexId = async (): Promise<number> => {
  const brands = await prisma.brand.findMany()
  const ids = brands.map(brand => brand.id)
  return Math.max(...ids) + 1
}


export const getBrandWithProducts = cache(async (brandId: number): Promise<BrandDBWithProductsType | null> => {
  return await prisma.brand.findUnique({
    where: {id: brandId},
    include: {products: {include: {shoeses: true}}},
  })
})

export const getBrandByUrl = cache(async (url: string): Promise<BrandDBType | null> => {
  return await prisma.brand.findUnique({
    where: {url: url}
  })
})

export const getBrandWithProductsByUrl = cache(async (url: string): Promise<BrandDBWithProductsType | null> => {
  return await prisma.brand.findUnique({
    where: {url: url},
    include: {products: {include: {shoeses: true}}},
  })
})


export const getBrandUrls = cache(async (): Promise<string[]> => {
  const brands = await prisma.brand.findMany()
  return brands.map(brand => brand.url)
})

export const createBrand = async (data: CreateBrandType): Promise<BrandDBType> => {
  return await prisma.brand.create({
    data
  })
}
export const editeBrand = async (id: number, data: UpdateBrandType): Promise<BrandDBType> => {
  return await prisma.brand.update({
    where: {id},
    data: data
  })
}
export const deleteBrand = async (brandId: number) => {
  await prisma.brand.delete({
    where: {id: brandId}
  })
}