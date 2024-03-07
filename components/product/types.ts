export type productType = 'product' | 'shoes'

export interface ProductBase {
  type: productType
  product_key: string
  name: string
  desc: string
  price: number
  price_prefix: string
  images: string[]
  userId: string | undefined
  isFavorite: boolean
  isNew: boolean
  qty: number
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
}

export type ProductType = SimpleProductProps | ShoesType

export const isShoes = (product: ProductType) => 'sizes' in product

