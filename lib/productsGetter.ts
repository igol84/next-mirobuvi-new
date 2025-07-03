import {cookies} from "next/headers";
import {PageType, ProductType} from "@/components/Products/types";
import {createProduct} from "@/lib/productCardData";
import {getProductByUrl} from "@/lib/db/product";
import {Locale} from "@/i18n/request";

type Type = {
  (locale: Locale, isAdmin: boolean, isAuth: boolean, userDiscount: number): Promise<ProductType[]>
}

export const getViewedProducts: Type = async (locale, isAdmin, isAuth, userDiscount) => {
  const page: PageType = 'viewed'
  const viewedProductsJSON: string | undefined = cookies().get("viewedProducts")?.value
  const viewedProductUrls: string[] = viewedProductsJSON ? JSON.parse(viewedProductsJSON) : []
  const viewedProducts: ProductType[] = []
  for (const viewedProductUrl of viewedProductUrls.reverse()) {
    const productData = await getProductByUrl(String(viewedProductUrl))
    let access = true
    if (productData) {
      if (!isAdmin) {
        if (!productData.active || !productData.brand.active)
          access = false
      }
      if (!isAuth) {
        if (productData.private || productData.brand.private)
          access = false
      }
      if (access)
        viewedProducts.push(createProduct(productData, locale, userDiscount, page))
    }

  }
  return viewedProducts
}
