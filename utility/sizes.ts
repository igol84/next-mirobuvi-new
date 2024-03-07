import _, {floor} from "lodash";
import {SizeType} from "@/components/product/types";
import {SizeSchema} from "@/schemas/data";

export const createWithEmptySizes = (sizesData: SizeSchema[]): SizeType[] => {
  if (sizesData.length === 0)
    return []
  const sizes = sizesData.map(size => size.size)
  const minSize = floor(Math.min(...sizes))
  const maxSize = floor(Math.max(...sizes))
  const rangeSizes = _.range(minSize + 1, maxSize).map(size => ({size: size, inStock: false, length: null}))

  const inStockSizes: SizeType[] = sizesData.map(sizeData => (
    {size: sizeData.size, inStock: true, length: sizeData.length}
  ))
  const emptySizes: SizeType[] = []
  rangeSizes.forEach(rangeSize => {
    const inStock = inStockSizes.find(size => size.size === rangeSize.size)
    if (!inStock) {
      emptySizes.push(rangeSize)
    }
  })
  const allSizes = inStockSizes.concat(emptySizes)
  return _.sortBy(allSizes, 'size')
}