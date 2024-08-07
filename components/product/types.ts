export type productType = 'product' | 'shoes'

export type SimilarProduct = {
  name: string
  url: string
  urlImage: string
}


export interface ProductBase {
  id: number
  type: productType
  inStock: boolean
  url: string
  similarProducts: SimilarProduct[]
  name: string
  desc: string
  defaultPrice: number
  price: number
  oldPrice: number | null
  discount: number
  price_prefix: string
  images: string[]
  userId: string | undefined
  isFavorite: boolean
  isNew: boolean
}

export interface SimpleProductProps extends ProductBase {
  type: 'product'
}

export interface SizeType {
  size: number
  length: number | null
  inStock: boolean
}

export interface ShoesType extends ProductBase {
  type: 'shoes'
  sizes: SizeType[]
  selectedSize: number | null
}

export type ProductType = SimpleProductProps | ShoesType

export const isShoes = (product: ProductType) => 'sizes' in product

