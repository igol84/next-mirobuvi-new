import {ProductType} from "@/components/Products/types";
import {FilterMenuPriceType} from "@/app/[lang]/[urlTag]/types";
import _ from "lodash";

type GetFilterMenuPrice = {
  (
    products: ProductType[],
    minValue?: number,
    maxValue?: number,
  ): FilterMenuPriceType
}

const getFilterMenuPrice: GetFilterMenuPrice = (products, minValue, maxValue) => {
  const minPrice = _.minBy(products, product => product.price)?.price
  const maxPrice = _.maxBy(products, product => product.price)?.price
  const minInitial = minPrice ? minPrice : 0
  const maxInitial = maxPrice ? maxPrice : 0
  const filterMenuPriceType: FilterMenuPriceType = {
    minInitial,
    maxInitial,
    minValue: minValue ? minValue : minInitial,
    maxValue: maxValue ? maxValue : maxInitial,
  }
  return filterMenuPriceType
}

export default getFilterMenuPrice