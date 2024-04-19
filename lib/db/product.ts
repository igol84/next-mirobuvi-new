import {cache} from 'react'
import {Prisma, Product} from "@prisma/client";
import {prisma} from "@/lib/db/prisma";


export type ProductWithDetailsDBType = Prisma.ProductGetPayload<{ include: { shoeses: true } }>
export type CreateProductType = Omit<Prisma.ProductCreateInput, 'brand'> & { brand_id: number }

export const getProducts = cache(async (): Promise<ProductWithDetailsDBType[]> => {
  return  await prisma.product.findMany({ include: { shoeses: true } })
})

export const getProductByUrl = cache(async (url:string): Promise<ProductWithDetailsDBType | null> => {
  return  await prisma.product.findUnique({
    where: {url: url},
    include: { shoeses: true }
  })
})

export const getProductUrls = cache(async (): Promise<string[]> => {
  const products = await prisma.product.findMany()
  return products.map(product => product.url)
})

export const createProduct = async (data: CreateProductType): Promise<Product> => {
  return await prisma.product.create({
    data
  })
}