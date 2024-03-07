import 'server-only'

import {PaginationBarProps} from "@/components/base/PaginationBar";
import {ProductType} from "@/components/Products/types";
import {SortingType} from "@/components/base/SortingSelect/types";
import _ from "lodash";

type GetPageData = {
  <T>(
    items: T[],
    currentPage: number,
    withoutOneProduct?: boolean
  ): Promise<[
    itemsSlice: T[],
    paginationBar: PaginationBarProps,
  ]>
}
const defaultItemsOnPage = 25
export const getPageData: GetPageData = async (items, currentPage, withoutOneProduct = false) => {
  const itemsOnPage = withoutOneProduct ? defaultItemsOnPage - 1 : defaultItemsOnPage
  const totalProductsCount = items.length
  const totalPages = Math.ceil(totalProductsCount / itemsOnPage)
  currentPage = currentPage > totalPages ? totalPages : currentPage
  const skip = (currentPage - 1) * itemsOnPage
  const itemsSlice = items.slice(skip, skip + itemsOnPage)
  const paginationBar: PaginationBarProps = {totalPages, currentPage}

  return [itemsSlice, paginationBar]
}

export const sortingProducts = (products: ProductType[], sortingBy: SortingType): ProductType[] => {
  const isInStock = (product: ProductType): boolean => product.qty > 0
  switch (sortingBy) {
    case "byOrder": {
      return _.orderBy(products, [isInStock, 'date'], ['desc', 'desc'])
    }
    case "byIncreasingPrice": {
      return _.orderBy(products, [isInStock, 'price'], ['desc', 'asc'])
    }
    case "byDecreasingPrice": {
      return _.orderBy(products, [isInStock, 'price'], ['desc', 'desc'])
    }
    case "byName": {
      return _.orderBy(products, [isInStock, 'name'], ['desc', 'asc'])
    }
    default: {
      return _.orderBy(products, [isInStock, 'date'], ['desc', 'desc'])
    }
  }
}