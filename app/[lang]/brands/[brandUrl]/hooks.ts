import {useContext} from "react";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {BreadCrumbData} from "@/components/base/BreadCrumb";

export const useBrandCrumbs = (brandName: string, brandUrl: string) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("breadcrumb")

  const breadCrumbs: BreadCrumbData[] = []
  const brandCrumb: BreadCrumbData = {
    label: d('brands'),
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