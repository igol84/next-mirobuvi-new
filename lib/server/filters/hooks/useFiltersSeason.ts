import {FilterSeason, FilterSeasonType} from "@/app/[lang]/[urlTag]/types";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {createUrl} from "@/lib/format";
import {SeasonType} from "@/components/Container/FilterMenu/ShoesMenu/Season";

type UseSeason = {
  (
    filterSeasonType: FilterSeasonType
  ): SeasonType
}

const useFiltersSeason: UseSeason = (filterSeasonType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  let params = new URLSearchParams(searchParams.toString())
  const onClick = (season: FilterSeason) => {
    if (season) {
      params.delete('page')
      if (params.has('season', season))
        params.delete('season')
      else
        params.set('season', season)
      const url = createUrl(pathname, params.toString())
      router.push(url)
    }
  }
  const seasonType: SeasonType = {filterSeasonType, onClick}
  return seasonType
}

export default useFiltersSeason