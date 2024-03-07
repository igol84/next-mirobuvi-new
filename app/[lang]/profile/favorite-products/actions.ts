'use server'

import {putFavoriteProduct} from "@/lib/db/user";
import {revalidatePath} from "next/cache";

export const serverActionPutProductLike = async (userId: string, productUrl: string) => {
  const result = await putFavoriteProduct(userId, productUrl)
  revalidatePath("/[lang]/profile/favorite-products", "page")
  return result
}