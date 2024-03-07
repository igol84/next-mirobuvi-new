import {FilterMenuPriceType} from "@/app/[lang]/[urlTag]/types";
import {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {createUrl} from "@/lib/format";

type UseFiltersPrice = {
  (
    filterMenuPriceType: FilterMenuPriceType
  ): PriceFilterType
}

const useFiltersPrice: UseFiltersPrice = (filterMenuPriceType) => {
  const {minInitial, maxInitial, minValue, maxValue} = filterMenuPriceType
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  let params = new URLSearchParams(searchParams.toString())
  const maxValueInit = maxValue && maxValue > 0 && maxValue <= maxInitial
    ? maxValue
    : maxInitial
  const minValueInit = minValue
    ? minValue < 0
      ? minInitial
      : minValue <= maxValueInit
        ? minValue
        : maxValueInit
    : minInitial
  const [min, setMin] = useState<number>(minValueInit)
  const [max, setMax] = useState<number>(maxValueInit)

  useEffect(() => {
    setMin(minValueInit)
    setMax(maxValueInit)
  }, [minValueInit, maxValueInit]);

  const onMinChange = (min: number) => {
    setMin(min)
  }
  const onMaxChange = (max: number) => {
    setMax(max)
  }

  const minPrice = min === minInitial ? undefined : min
  const maxPrice = max === maxInitial ? undefined : max

  const onSubmit = () => {
    params.delete('page')
    if (minPrice !== undefined) {
      params.set('minPrice', String(minPrice))
    } else {
      params.delete('minPrice')
    }
    if (maxPrice !== undefined) {
      params.set('maxPrice', String(maxPrice))
    } else {
      params.delete('maxPrice')
    }
    const url = createUrl(pathname, params.toString())
    router.push(url)
  }
  const priceFilterType: PriceFilterType = {
    minInitial, min, onMinChange, maxInitial, max, onMaxChange, onSubmit
  }
  return priceFilterType
}

export default useFiltersPrice