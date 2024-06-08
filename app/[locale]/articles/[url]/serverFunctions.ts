import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";


type GetBreadCrumbData = {
  (
    locale: Locale,
    pageName: string,
    url: string
  ): Promise<BreadCrumbData[]>
}
export const getBreadCrumb: GetBreadCrumbData = async (locale, pageName, url) => {
  const t = await getTranslations({locale, namespace: 'breadcrumb'})
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: t('articles'),
    href: `/${locale}/articles`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label: pageName,
    href: `/${locale}/articles/${url}`
  }
  breadCrumbs.push(currentBrandCrumb)

  return breadCrumbs
}


