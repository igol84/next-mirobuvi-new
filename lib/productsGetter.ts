import {cookies} from "next/headers";
import {PageType, ProductType} from "@/components/Products/types";
import {getProductData} from "@/app/api/fetchFunctions";
import {Lang} from "@/dictionaries/get-dictionary";
import {createProduct} from "@/lib/productCardData";

export const getViewedProducts = async (lang: Lang) => {
  const page: PageType = 'viewed'
  const viewedProductsJSON: string | undefined = cookies().get("viewedProducts")?.value
  const viewedProductUrls: string[] = viewedProductsJSON ? JSON.parse(viewedProductsJSON) : []
  const viewedProducts: ProductType[] = []
  for (const viewedProductUrl of viewedProductUrls.reverse()) {
    const productData = await getProductData(viewedProductUrl)
    if (productData)
      viewedProducts.push(createProduct(productData, lang, page))
  }
  return viewedProducts
}
