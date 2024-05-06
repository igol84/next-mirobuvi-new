'use server'

import {getProduct, updateProduct, UpdateProductType} from "@/lib/db/product";
import {revalidatePath} from "next/cache";
import {SafeParseReturnType} from "zod";
import {ProductEditorSchema, schema} from "@/components/product/SimpleProduct/types";

export const serverActionPriceEdite = async (id: number, price: number) => {
  const parse: SafeParseReturnType<ProductEditorSchema, ProductEditorSchema> = schema.safeParse({id, price})
  if (parse.success){
    const date = parse.data
    const product = await getProduct(date.id)
    if(product) {
      const updateDate: UpdateProductType = {
        id: date.id, price: date.price
      }
      await updateProduct(id, updateDate)
      revalidatePath("/[lang]/products/[productUrl]", 'page')
    }
  }
}