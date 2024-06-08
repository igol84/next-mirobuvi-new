import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";


type GetBreadCrumbData = {
  (
    locale: Locale,
  ): Promise<BreadCrumbData[]>
}
export const getBreadCrumb: GetBreadCrumbData = async (locale) => {
  const t = await getTranslations({locale})
  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: t('breadcrumb.brands'),
    href: `/${locale}/brands`
  }
  breadCrumbs.push(brandCrumb)

  const currentBrandCrumb: BreadCrumbData = {
    label:  t('brandsAdmin.addBrand'),
    href: ''
  }
  breadCrumbs.push(currentBrandCrumb)
  return breadCrumbs
}


