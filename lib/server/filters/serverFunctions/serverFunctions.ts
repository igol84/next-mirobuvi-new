import 'server-only'
import {FilterMenuType, isColor, isGender, isProductType, isSeason} from "@/app/[locale]/[urlTag]/types";
import {ProductType} from "@/components/Products/types";
import getFilterMenuPrice from "@/lib/server/filters/serverFunctions/getFilterMenuPrice";
import getFilterSizes from "@/lib/server/filters/serverFunctions/getFilterSizes";
import getFilterProductType from "@/lib/server/filters/serverFunctions/getFilterProductType";
import getFilterGender from "@/lib/server/filters/serverFunctions/getFiterGender";
import getFilterColor from "@/lib/server/filters/serverFunctions/getFiterColor";
import getFilterSeason from "@/lib/server/filters/serverFunctions/getFiterSeason";
import {
  filterProductsByColor,
  filterProductsByMaxPrice,
  filterProductsByMinPrice,
  filterProductsByProductType, filterProductsBySeason,
  filterProductsBySize,
  filterProductsByTag
} from "@/lib/server/filters/serverFunctions/filtering";
import {FiltersValues} from "@/lib/server/filters/serverFunctions/types";


type GetFiltersType = {
  (
    products: ProductType[],
    filtersValues: FiltersValues,
    sizesAllList?: number[],
    hiddenProductTypeMenu?: boolean
  ): FilterMenuType
}

export const getFiltersType: GetFiltersType = (
  products, filtersValues, sizesAllList, hiddenProductTypeMenu
) => {
  const {minPrice, maxPrice, productType, size, gender, color, season} = filtersValues
  const minPriceValue = minPrice ? Number(minPrice) : undefined
  const maxPriceValue = maxPrice ? Number(maxPrice) : undefined
  const filterMenuPriceType = getFilterMenuPrice(products, minPriceValue, maxPriceValue)
  const filterProductType = getFilterProductType(products, productType, hiddenProductTypeMenu)
  const filterSizesType = getFilterSizes(products, size, sizesAllList)
  const filterGenderType = getFilterGender(products, gender)
  const filterColorType = getFilterColor(products, color)
  const filterSeasonType = getFilterSeason(products, season)
  const filterMenuType: FilterMenuType = {
    filterMenuPriceType, filterProductType, filterSizesType, filterGenderType, filterColorType, filterSeasonType
  }
  return filterMenuType
}


type FilterProducts = {
  (
    products: ProductType[],
    filtersValues: FiltersValues
  ): {
    products: ProductType[],
    filterMenuType: FilterMenuType
  }
}

export const getFilterProducts: FilterProducts = (products, filtersValues) => {
  const {minPrice, maxPrice, productType, gender, color, season} = filtersValues
  const minPriceValue = minPrice ? Number(minPrice) : undefined
  const maxPriceValue = maxPrice ? Number(maxPrice) : undefined
  const {
    filterMenuPriceType,
    filterProductType,
    filterSizesType
  } = getFiltersType(products, filtersValues)
  if (productType && isProductType(productType))
    products = filterProductsByProductType(products, productType)

  if (filterSizesType.selectedSizes && filterSizesType.selectedSizes.length > 0) {
    products = filterProductsBySize(products, filterSizesType.selectedSizes)
  }

  if (isGender(gender)) {
    products = filterProductsByTag(products, gender)
  }

  if (isColor(color)) {
    products = filterProductsByColor(products, color)
  }

  if (isSeason(season)) {
    products = filterProductsBySeason(products, season)
  }

  if (minPriceValue)
    products = filterProductsByMinPrice(products, minPriceValue)
  if (maxPriceValue)
    products = filterProductsByMaxPrice(products, maxPriceValue)

  let filterMenuTypeSecond = getFiltersType(
    products, filtersValues, filterSizesType.sizesList,
    filterProductType.hidden
  )

  const filterMenuType: FilterMenuType = {...filterMenuTypeSecond, filterMenuPriceType}
  return {products, filterMenuType}
}
