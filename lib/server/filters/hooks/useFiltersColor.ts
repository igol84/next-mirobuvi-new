import {FilterColor, FilterColorType} from "@/app/[lang]/[urlTag]/types";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {createUrl} from "@/lib/format";
import {ColorType} from "@/components/Container/FilterMenu/ShoesMenu/Color";

type UseColor = {
  (
    filterColorType: FilterColorType
  ): ColorType
}

const useFiltersColor: UseColor = (filterColorType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  let params = new URLSearchParams(searchParams.toString())
  const onClick = (color: FilterColor) => {
    if (color) {
      params.delete('page')
      if (params.has('color', color))
        params.delete('color')
      else
        params.set('color', color)
      const url = createUrl(pathname, params.toString())
      router.push(url)
    }
  }
  const colorType: ColorType = {filterColorType, onClick}
  return colorType
}

export default useFiltersColor