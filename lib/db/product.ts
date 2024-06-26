import {cache} from 'react'
import {Prisma, Product} from "@prisma/client";
import {prisma} from "@/lib/db/prisma";
import {SizeType} from "@/components/product/admin/shoes/types";


export type ProductDBType = Prisma.ProductGetPayload<{}>
export type ProductWithDetailsDBType = Prisma.ProductGetPayload<{ include: { shoeses: true, brand: true } }>
export type CreateProductType = Omit<Prisma.ProductCreateInput, 'brand'> & { id: number, brand_id: number }
export type UpdateProductType = Prisma.ProductUncheckedUpdateInput

export type CreateShoesType = Prisma.ShoesCreateManyInput

export const getProducts = cache(async (): Promise<ProductWithDetailsDBType[]> => {
  return await prisma.product.findMany({include: {shoeses: true, brand: true}})
})

export const getProduct = cache(async (productId: number): Promise<ProductDBType | null> => {
  return await prisma.product.findUnique({
    where: {id: productId},
  })
})

export const getProductByUrl = cache(async (url: string): Promise<ProductWithDetailsDBType | null> => {
  return await prisma.product.findUnique({
    where: {url: url},
    include: {shoeses: true, brand: true}
  })
})

export const getProductsByGroupName = cache(async (groupName: string): Promise<ProductWithDetailsDBType[]> => {
  return await prisma.product.findMany({
    where: {group_name: groupName},
    include: {shoeses: true, brand: true}
  })
})

export const getProductUrls = cache(async (): Promise<string[]> => {
  const products = await prisma.product.findMany()
  return products.map(product => product.url)
})

export const getProductNexId = async (): Promise<number> => {
  const products = await prisma.product.findMany()
  const ids = products.map(product => product.id)
  return Math.max(...ids) + 1
}

export const createProduct = async (data: CreateProductType, shoes: SizeType[]): Promise<Product> => {
  const product = await prisma.product.create({
    data
  })
  if (data.type === 'shoes')
    await createShoes(product.id, shoes)
  return product
}

export const updateProduct = async (id: number, data: UpdateProductType, shoes?: SizeType[]): Promise<Product> => {
  let oldProduct = null
  if (data.id && typeof data.id === 'number')
    oldProduct = await getProduct(data.id as number)
  const product = await prisma.product.update({
    where: {id},
    data: data
  })
  if (data.type === 'shoes' && shoes) {
    await prisma.shoes.deleteMany({where: {product_id: product.id}})
    await createShoes(product.id, shoes)
  } else if (oldProduct?.type === 'shoes' && data.type !== 'shoes') {
    await prisma.shoes.deleteMany({where: {product_id: product.id}})
  }
  return product
}

export const updateProductPrice = async (id: number, price: number, discount: number): Promise<void> => {
  await prisma.product.update({
    where: {id},
    data: {price, discount}
  })
}

export const createShoes = async (productId: number, shoes: SizeType[]): Promise<void> => {
  const shoesDB: CreateShoesType[] = shoes.map(shoe => {
    return {
      product_id: productId,
      size: shoe.size,
      length: shoe.length,
      is_available: shoe.isAvailable
    }
  })
  if (shoesDB.length > 0)
    await prisma.shoes.createMany({
      data: shoesDB,
    })
}

export const deleteProduct = async (productId: number): Promise<void> => {
  await prisma.product.delete({
    where: {id: productId}
  })
}

export const editSizes = async (id: number, sizes: SizeType[]) => {
  await prisma.shoes.deleteMany({where: {product_id: id}})
  await createShoes(id, sizes)
}