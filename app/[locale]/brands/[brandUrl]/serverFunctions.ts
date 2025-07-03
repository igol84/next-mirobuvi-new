import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getTranslations} from "next-intl/server";
import {Locale} from "@/i18n/request";



type GetBreadCrumbData = {
  (
    locale: Locale,
    pageName: string,
    brand: string
  ): Promise<BreadCrumbData[]>
}
export const getBreadCrumb: GetBreadCrumbData = async (locale, brandName, brandUrl) => {
  const t = await getTranslations({locale, namespace: 'breadcrumb'})
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: t('brands'),
    href: `/${locale}/brands`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label: brandName,
    href: `/${locale}/brands/${brandUrl}`
  }
  breadCrumbs.push(currentBrandCrumb)

  return breadCrumbs
}


