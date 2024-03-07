import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {ParentTagForBreadCrumb, TagUrl} from "@/app/[lang]/[urlTag]/types";
import {ProductType} from "@/components/Products/types";
import _ from "lodash";

export const isSinglePage = (tagData: TagUrl): boolean => tagData.search === ''

export function getBreadCrumbDataSinglePage(pageName: string): BreadCrumbData[] {
  const breadCrumbs: BreadCrumbData[] = []
  const pageCrumb: BreadCrumbData = {
    label: pageName, href: ''
  }
  breadCrumbs.push(pageCrumb)
  return breadCrumbs
}

type GetBreadCrumbData = {
  (
    lang: Lang,
    pageName: string,
    parentTagForBreadCrumb?: ParentTagForBreadCrumb
  ): Promise<BreadCrumbData[]>
}

export const getBreadCrumbData: GetBreadCrumbData = async (lang, pageName, parent) => {
  const dict = await getDictionary(lang)
  const breadCrumbs: BreadCrumbData[] = []

  const brandCrumb: BreadCrumbData = {
    label: dict.breadcrumb.products, href: `/${lang}/products`
  }
  breadCrumbs.push(brandCrumb)

  if (parent) {
    const parentCrumb: BreadCrumbData = {
      label: parent.name, href: `/${lang}/${parent.url}`
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

export const searchProductsByTag = (products: ProductType[], searchValue: string): ProductType[] => {
  return products.filter(product => {
    const searchInTags = _.startCase(product.tags)
    const whatSearchInTags = _.startCase(searchValue)
    return searchInTags.includes(whatSearchInTags)
  })
}

export const searchProducts = (products: ProductType[], searchValue: string): ProductType[] => {
  return products.filter(product => {
    const searchInName = product.name.toLowerCase()
    const searchInTags = product.tags.toLowerCase()
    const whatSearch = searchValue.trim().toLowerCase()
    return searchInName.includes(whatSearch) || searchInTags.includes(whatSearch)
  })
}
