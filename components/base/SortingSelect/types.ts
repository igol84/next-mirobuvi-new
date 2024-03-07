export enum Sorting {
  byOrder,
  byIncreasingPrice,
  byDecreasingPrice,
  byName
}

export type SortingType = keyof typeof Sorting

export type SortingProps = {
  value: SortingType
}