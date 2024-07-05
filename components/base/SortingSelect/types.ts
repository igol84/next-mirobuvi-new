export enum Sorting {
  byDate,
  byIncreasingPrice,
  byDecreasingPrice,
  byName
}

export type SortingType = keyof typeof Sorting

export type SortingProps = {
  value: SortingType
}