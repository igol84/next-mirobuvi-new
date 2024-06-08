import {ProductType} from "@/components/Products/types";
import {allSeasons, FilterSeason, FilterSeasonType, isSeason} from "@/app/[locale]/[urlTag]/types";

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
      return product.season.toLowerCase() === season.toLowerCase()
    })
    if (productsIncludeSeason)
      seasons.push(season)
  })

  return {selectedSeason, seasons}
}

export default getFilterSeason