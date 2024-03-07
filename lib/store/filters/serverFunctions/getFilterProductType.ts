import {FilterProductType, FilterProductTypeType as ProductTypeType} from "@/app/[lang]/[urlTag]/types";
import {isShoes, ProductType} from "@/components/Products/types";


type GetFilterProductType = {
  (
    products: ProductType[],
    selectedProductType: string | undefined,
    hiddenInit?: boolean
  ): FilterProductType
}

const getFilterProductType: GetFilterProductType = (products, selectedProductType, hiddenInit) => {
  let productType: ProductTypeType = selectedProductType === 'shoes' ? 'shoes' : null
  let hidden = false
  const productTypes: Set<string> = new Set()

  products.forEach(product => {
    if (isShoes(product)) {
      productTypes.add('shoes')
    } else {
      productTypes.add('product')
    }
  })

  if (productTypes.size === 1) {
    if (productTypes.has('shoes')) {
      productType = 'shoes'
      hidden = true
    }
  }
  if(hiddenInit!==undefined)
    hidden = hiddenInit
  const filterProductType: FilterProductType = {productType, hidden}
  return filterProductType
}

export default getFilterProductType