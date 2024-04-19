import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";

type GetBreadCrumbData = {
  (
    lang: Lang,
    brandName: string,
    brandUrl: string,
    productName: string,
    productUrl: string,
  ): Promise<BreadCrumbData[]>
}
export const getBreadCrumb: GetBreadCrumbData = async (lang, brandName, brandUrl, productName, productUrl) => {
  const dict = await getDictionary(lang)
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: dict.breadcrumb.brands,
    href: `/${lang}/brands`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label: brandName,
    href: `/${lang}/brands/${brandUrl}`
  }
  breadCrumbs.push(currentBrandCrumb)

  const currentProduct: BreadCrumbData = {
    label: productName,
    href:  `/${lang}/products/${productUrl}`
  }
  breadCrumbs.push(currentProduct)

  const currentPage: BreadCrumbData = {
    label: dict.productAdmin.editProduct,
    href: ''
  }
  breadCrumbs.push(currentPage)

  return breadCrumbs
}


