export type ProductTypeType = 'product' | 'shoes'
export type PageType = 'catalog' | 'viewed'

export interface ProductBase {
  type: ProductTypeType
  id: number
  product_key: string
  url: string
  name: string
  price: number
  price_prefix: string
  page: PageType
  date: Date
  isNew: boolean
  qty: number
  tags: string
}

export interface SimpleProductProps extends ProductBase {
  type: 'product'
}

export interface ShoesType extends ProductBase {
  type: 'shoes'
  sizes: number[]
}

export type ProductType = SimpleProductProps | ShoesType

export const isShoes = (product: ProductType): product is ShoesType => 'sizes' in product

