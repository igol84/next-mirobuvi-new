import {ProductType} from "@/components/Products/types";
import {allGenders, FilterGender, FilterGenderType, isGender} from "@/app/[lang]/[urlTag]/types";
import _ from "lodash";

type GetFilterGender = {
  (
    products: ProductType[],
    gender: string | undefined
  ): FilterGenderType
}

const getFilterGender: GetFilterGender = (products, gender) => {
  const selectedGender = isGender(gender) ? gender : null
  let genders: FilterGender[] = []

  allGenders.forEach(gender => {
    const productsIncludeGender = products.find(product => {
      return _.words(product.tags.toLowerCase()).includes(gender)
    })
    if (productsIncludeGender)
      genders.push(gender)
  })

  return {selectedGender, genders}
}

export default getFilterGender