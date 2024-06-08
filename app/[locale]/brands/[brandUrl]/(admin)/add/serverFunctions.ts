import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";


type GetBreadCrumbData = {
  (
    locale: Locale,
    pageName: string,
    brandUrl: string
  ): Promise<BreadCrumbData[]>
}
export const getBreadCrumb: GetBreadCrumbData = async (locale, brandName, brandUrl) => {
  const t = await getTranslations({locale})
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: t('breadcrumb.brands'),
    href: `/${locale}/brands`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label: brandName,
    href: `/${locale}/brands/${brandUrl}`
  }
  breadCrumbs.push(currentBrandCrumb)

  const currentPage: BreadCrumbData = {
    label: t('productAdmin.addProduct'),
    href: ''
  }
  breadCrumbs.push(currentPage)

  return breadCrumbs
}


