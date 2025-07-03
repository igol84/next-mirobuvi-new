import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";

export const useBrandCrumbs = () => {
  const t = useTranslations('breadcrumb')
  const locale = useLocale() as Locale

  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: t('articles'),
    href: `/${locale}/articles`
  }
  breadCrumbs.push(brandCrumb)
  return breadCrumbs
}