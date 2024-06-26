import {FilterMenuType} from "@/app/[locale]/[urlTag]/types";
import useSizesType from "@/lib/server/filters/hooks/useSizesType";
import {ShoesMenuType} from "@/components/Container/FilterMenu/ShoesMenu";
import useFiltersGender from "@/lib/server/filters/hooks/useFiltersGander";
import useFiltersColor from "@/lib/server/filters/hooks/useFiltersColor";
import useFiltersSeason from "@/lib/server/filters/hooks/useFiltersSeason";

type UseSizesType = {
  (
    filterMenuType: FilterMenuType
  ): ShoesMenuType
}

const useShoesMenu: UseSizesType = (filterMenuType) => {
  const sizesType = useSizesType(filterMenuType.filterSizesType)
  const genderType = useFiltersGender(filterMenuType.filterGenderType)
  const colorType = useFiltersColor(filterMenuType.filterColorType)
  const seasonType = useFiltersSeason(filterMenuType.filterSeasonType)
  const shoesMenuType: ShoesMenuType = {sizesType, genderType, colorType, seasonType}
  return shoesMenuType
}

export default useShoesMenu