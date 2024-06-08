
import {TagUrl as TagUrlSchema} from "@/lib/db/tagUrl";
import {Locale} from "@/i18n";

export interface TagUrl {
  url: string
  submenu?: TagUrl[]
  orderNumber: number
  search: string
  desc: string
  text: string
}

export const convertToTagUrlFromDB = (tagUrlDB: TagUrlSchema, locale: Locale, submenu?: TagUrl[]): TagUrl => {
  return {
    url: tagUrlDB.url,
    submenu,
    orderNumber: tagUrlDB.order_number,
    search: locale === 'en' ? tagUrlDB.search_en : tagUrlDB.search_ua,
    desc: locale === 'en' ? tagUrlDB.desc_en : tagUrlDB.desc_ua,
    text: locale === 'en' ? tagUrlDB.text_en : tagUrlDB.text_ua
  }
}

export interface ParentTagForBreadCrumb {
  name: string
  url: string
}

export type FilterMenuPriceType = {
  minInitial: number
  maxInitial: number
  minValue: number
  maxValue: number
}

export type FilterProductTypeType = null | 'shoes'

export type FilterProductType = {
  productType: FilterProductTypeType
  hidden: boolean
}

export const isProductType = (productType: string | null): productType is FilterProductTypeType => {
  return [null, 'shoes'].includes(productType)
}

export type FilterSizesType = {
  sizesAllList: number[]
  sizesList: number[]
  selectedSizes: number[]
}

export const allGenders = ["men's", "women's"] as const
export type FilterGender = typeof allGenders[number]
export const isGender = (gender: any): gender is FilterGender => allGenders.includes(gender)
export type FilterGenderType = {
  genders: FilterGender[]
  selectedGender: FilterGender | null
}

export const allColors = [
  "black", "white", "green", "blackWhite", "yellow", "red", "blue", "gray", "purple", "pink", "brown", "beige",
  "burgundy", "orange"
] as const
export type FilterColor = typeof allColors[number]
export const isColor = (color: any): color is FilterColor => allColors.includes(color)
export type FilterColorType = {
  colors: FilterColor[]
  selectedColor: FilterColor | null
}

export const allSeasons = ["summer", "autumn", "winter"] as const
export type FilterSeason = typeof allSeasons[number]
export const isSeason = (season: any): season is FilterSeason => allSeasons.includes(season)
export type FilterSeasonType = {
  seasons: FilterSeason[]
  selectedSeason: FilterSeason | null
}
export type FilterMenuType = {
  filterMenuPriceType: FilterMenuPriceType
  filterProductType: FilterProductType
  filterSizesType: FilterSizesType
  filterGenderType: FilterGenderType
  filterColorType: FilterColorType
  filterSeasonType: FilterSeasonType
}


