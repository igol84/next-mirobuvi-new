import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";


type GetBreadCrumbData = {
  (
    lang: Lang,
    pageName: string,
    url: string
  ): Promise<BreadCrumbData[]>
}
export const getBreadCrumb: GetBreadCrumbData = async (lang, pageName, url) => {
  const dict = await getDictionary(lang)
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: dict.breadcrumb.articles,
    href: `/${lang}/articles`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label: pageName,
    href: `/${lang}/articles/${url}`
  }
  breadCrumbs.push(currentBrandCrumb)

  return breadCrumbs
}


