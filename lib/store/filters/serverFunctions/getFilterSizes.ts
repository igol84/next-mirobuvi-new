import {ProductType} from "@/components/Products/types";
import {FilterSizesType} from "@/app/[lang]/[urlTag]/types";
import _ from "lodash";

type GetFilterSizes = {
  (
    products: ProductType[],
    size?: string | string[],
    sizesAllList?: number[],
  ): FilterSizesType
}

const getFilterSizes: GetFilterSizes = (products, size, sizesAllList = []) => {
  const sizesListSet: Set<number> = new Set()
  products.forEach(product => {
    if (product.type === 'shoes') {
      const sizes = product.sizes
      sizes.forEach(size => sizesListSet.add(size))
    }
  })
  const sizesListSetSorted = Array.from(sizesListSet).sort()

  const sizes: number[] = []
  if (size) {
    if (_.isArray(size)) {
      size.forEach(size => {
        const numberSize = _.toNumber(size)
        if (_.isNumber(numberSize))
          sizes.push(numberSize)
      })
    } else {
      const numberSize = _.toNumber(size)
      if (_.isNumber(numberSize))
        sizes.push(numberSize)
    }
  }
  const selectedSizes = _.uniq(sizes)

  const filterSizesType: FilterSizesType = {sizesList: sizesListSetSorted, selectedSizes, sizesAllList}
  return filterSizesType
}

export default getFilterSizes
