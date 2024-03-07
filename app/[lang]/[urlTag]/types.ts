import {TagUrlSchema} from "@/schemas/data";
import {Lang} from "@/dictionaries/get-dictionary";

export interface TagUrl {
  url: string
  submenu?: TagUrl[]
  orderNumber: number
  search: string
  desc: string
  text: string
}

export const convertToTagUrlFromDB = (tagUrlDB: TagUrlSchema, lang: Lang, submenu?: TagUrl[]): TagUrl => {
  return {
    url: tagUrlDB.url,
    submenu,
    orderNumber: tagUrlDB.order_number,
    search: lang === 'en' ? tagUrlDB.search : tagUrlDB.search_ua,
    desc: lang === 'en' ? tagUrlDB.desc : tagUrlDB.desc_ua,
    text: lang === 'en' ? tagUrlDB.text : tagUrlDB.text_ua
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

export type FilterGender = "men's" | "women's"
export const allGenders: FilterGender[] = ["men's", "women's"]
export const isGender = (gender: any): gender is FilterGender => allGenders.includes(gender)
export type FilterGenderType = {
  genders: FilterGender[]
  selectedGender: FilterGender | null
}

export type FilterColor = "black" | "white" | "blackWhite" | "green" | "yellow" | "red" | "blue" | "gray" | "purple"
  | "brown"
export const allColors: FilterColor[] = [
  "black", "white", "green", "blackWhite", "yellow", "red", "blue", "gray", "purple", "brown"
]
export const isColor = (color: any): color is FilterColor => allColors.includes(color)
export type FilterColorType = {
  colors: FilterColor[]
  selectedColor: FilterColor | null
}

export type FilterSeason = "summer" | "autumn" | "winter"
export const allSeasons: FilterSeason[] = [
  "summer", "autumn", "winter"
]
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


