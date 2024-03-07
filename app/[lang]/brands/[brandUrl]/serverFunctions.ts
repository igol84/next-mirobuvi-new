import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";


type GetBreadCrumbData = {
  (
    lang: Lang,
    pageName: string,
    brand: string
  ): Promise<BreadCrumbData[]>
}
export const getBreadCrumb: GetBreadCrumbData = async (lang, brandName, brandUrl) => {
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

  return breadCrumbs
}


