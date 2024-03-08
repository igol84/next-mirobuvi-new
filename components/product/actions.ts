'use server'

import {pushFavoriteProduct, putFavoriteProduct} from "@/lib/db/user";
import {revalidatePath} from "next/cache";

export const serverActionPushProductLike = async (userId: number, productUrl: string) => {
  const result = await pushFavoriteProduct(userId, productUrl)
  revalidatePath("/[lang]/products/[productUrl]", "page")
  return result
}

export const serverActionPutProductLike = async (userId: number, productUrl: string) => {
  const result = await putFavoriteProduct(userId, productUrl)
  revalidatePath("/[lang]/products/[productUrl]", "page")
  return result
}