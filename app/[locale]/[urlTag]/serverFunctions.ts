import 'server-only'

import _ from "lodash";
import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {ParentTagForBreadCrumb, TagUrl} from "@/app/[locale]/[urlTag]/types";
import {ProductWithDetailsDBType} from "@/lib/db/product";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";

export const isSinglePage = (tagData: TagUrl): boolean => tagData.search === ''

export function getBreadCrumbDataSinglePage(pageName: string): BreadCrumbData[] {
  const breadCrumbs: BreadCrumbData[] = []
  const pageCrumb: BreadCrumbData = {label: pageName, href: ''}
  breadCrumbs.push(pageCrumb)
  return breadCrumbs
}

type GetBreadCrumbData = {
  (
    locale: Locale,
    pageName: string,
    parentTagForBreadCrumb?: ParentTagForBreadCrumb
  ): Promise<BreadCrumbData[]>
}

export const getBreadCrumbData: GetBreadCrumbData = async (locale, pageName, parent) => {
  const t = await getTranslations({locale, namespace: 'breadcrumb'})
  const breadCrumbs: BreadCrumbData[] = []

  const brandCrumb: BreadCrumbData = {
    label: t('products'), href: `/${locale}/products`
  }
  breadCrumbs.push(brandCrumb)

  if (parent) {
    const parentCrumb: BreadCrumbData = {
      label: parent.name, href: `/${locale}/${parent.url}`
    }
    breadCrumbs.push(parentCrumb)
  }
  if (pageName !== 'header') {
    const pageCrumb: BreadCrumbData = {
      label: pageName, href: ''
    }
    breadCrumbs.push(pageCrumb)
  }

  return breadCrumbs
}

type SearchProductsByTag = {
  (products: ProductWithDetailsDBType[], searchValue: string): ProductWithDetailsDBType[]
}

export const searchProductsByTag: SearchProductsByTag = (products, searchValue) => {
  return products.filter(product => {
    const searchInTags = _.startCase(product.tags)
    const whatSearchInTags = _.startCase(searchValue)
    return searchInTags.includes(whatSearchInTags)
  })
}

type SearchProducts = {
  (products: ProductWithDetailsDBType[], searchValue: string): ProductWithDetailsDBType[]
}

export const searchProducts: SearchProducts = (products, searchValue) => {
  return products.filter(product => {
    const searchInNameUa = product.name_ua.toLowerCase()
    const searchInNameRu = product.name_ru.toLowerCase()
    const searchInNameEn = product.name_en.toLowerCase()
    const searchInTags = product.tags.toLowerCase()
    const whatSearch = searchValue.trim().toLowerCase()
    return searchInNameUa.includes(whatSearch) || searchInNameRu.includes(whatSearch) ||
      searchInNameEn.includes(whatSearch) || searchInTags.includes(whatSearch)
  })
}
