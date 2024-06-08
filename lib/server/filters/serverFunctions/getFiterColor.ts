import {ProductType} from "@/components/Products/types";
import {allColors, FilterColor, FilterColorType, isColor} from "@/app/[locale]/[urlTag]/types";

type GetFilterColor = {
  (
    products: ProductType[],
    color: string | undefined
  ): FilterColorType
}

const getFilterColor: GetFilterColor = (products, color) => {
  const selectedColor = isColor(color) ? color : null
  let colors: FilterColor[] = []

  allColors.forEach(color => {
    const productsIncludeColor = products.find(product => {
      return product.color.toLowerCase() === color.toLowerCase()
    })
    if (productsIncludeColor)
      colors.push(color)
  })

  return {selectedColor, colors}
}

export default getFilterColor