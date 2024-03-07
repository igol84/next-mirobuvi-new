import {ProductType} from "@/components/Products/types";
import {allSeasons, FilterSeason, FilterSeasonType, isSeason} from "@/app/[lang]/[urlTag]/types";
import _ from "lodash";

type GetFilterSeason = {
  (
    products: ProductType[],
    season: string | undefined
  ): FilterSeasonType
}

const getFilterSeason: GetFilterSeason = (products, season) => {
  const selectedSeason = isSeason(season) ? season : null
  let seasons: FilterSeason[] = []

  allSeasons.forEach(season => {
    const productsIncludeSeason = products.find(product => {
      return _.words(product.tags.toLowerCase()).includes(season.toLowerCase())
    })
    if (productsIncludeSeason)
      seasons.push(season)
  })

  return {selectedSeason, seasons}
}

export default getFilterSeason