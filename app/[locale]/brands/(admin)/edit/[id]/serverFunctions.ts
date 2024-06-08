import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";



type GetBreadCrumbData = {
  (
    locale: Locale ,
    pageName: string,
    brand: string
  ): Promise<BreadCrumbData[]>
}
export const getBreadCrumb: GetBreadCrumbData = async (locale, brandName) => {
  const t = await getTranslations({locale, namespace: 'breadcrumb'})
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: t('brands'),
    href: `/${locale}/brands`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label: brandName,
    href: ''
  }
  breadCrumbs.push(currentBrandCrumb)

  return breadCrumbs
}


