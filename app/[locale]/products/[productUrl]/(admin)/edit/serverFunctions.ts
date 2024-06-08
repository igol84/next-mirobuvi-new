import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";

type GetBreadCrumbData = {
  (
    locale: Locale,
    brandName: string,
    brandUrl: string,
    productName: string,
    productUrl: string,
  ): Promise<BreadCrumbData[]>
}
export const getBreadCrumb: GetBreadCrumbData = async (locale, brandName, brandUrl, productName, productUrl) => {
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

  const currentProduct: BreadCrumbData = {
    label: productName,
    href:  `/${locale}/products/${productUrl}`
  }
  breadCrumbs.push(currentProduct)

  const currentPage: BreadCrumbData = {
    label: t('productAdmin.editProduct'),
    href: ''
  }
  breadCrumbs.push(currentPage)

  return breadCrumbs
}


