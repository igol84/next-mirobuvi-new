'use server'

import {pushFavoriteProduct, putFavoriteProduct} from "@/lib/db/user";
import {revalidatePath} from "next/cache";
import {SafeParseReturnType} from "zod";
import {ProductEditorSchema, schema} from "@/components/product/SimpleProduct/types";
import {editSizes, getProduct, updateProductPrice} from "@/lib/db/product";
import {SizeType} from "@/components/product/admin/shoes/types";

export const serverActionPushProductLike = async (userId: number, productUrl: string) => {
  const result = await pushFavoriteProduct(userId, productUrl)
  revalidatePath("/[locale]/products/[productUrl]", "page")
  return result
}

export const serverActionPutProductLike = async (userId: number, productUrl: string) => {
  const result = await putFavoriteProduct(userId, productUrl)
  revalidatePath("/[locale]/products/[productUrl]", "page")
  return result
}

export const serverActionPriceEdit = async (id: number, price: number) => {
  const parse: SafeParseReturnType<ProductEditorSchema, ProductEditorSchema> = schema.safeParse({id, price})
  if (parse.success) {
    const formDate = parse.data
    const product = await getProduct(formDate.id)
    if (product && product.price !== formDate.price) {
      await updateProductPrice(id, formDate.price)
      revalidatePath("/[locale]/products/[productUrl]", 'page')
    }
  }
}

export const serverActionSizeEdit = async (shoesId: number, sizes: SizeType[]) => {
  const addedShoes: SizeType[] = []
  for (const size of sizes) {
    if (!addedShoes.map(size => size.size).includes(size.size) && size.size > 0 && size.length > 0)
      addedShoes.push(size)
  }
  await editSizes(shoesId, addedShoes)
  revalidatePath("/[locale]/products/[productUrl]", 'page')
}