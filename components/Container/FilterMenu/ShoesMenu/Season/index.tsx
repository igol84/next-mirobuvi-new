import React from 'react';
import {allSeasons, FilterSeason, FilterSeasonType} from "@/app/[lang]/[urlTag]/types";
import {Wrap} from "@chakra-ui/react";
import SeasonItem from "@/components/Container/FilterMenu/ShoesMenu/Season/SeasonItem";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

export type SeasonType = {
  filterSeasonType: FilterSeasonType
  onClick: (season: FilterSeason) => void
}

interface Props {
  seasonType: SeasonType
  onMobileMenuClose?: () => void
}

const Season = ({seasonType: {filterSeasonType: {selectedSeason, seasons}, onClick}}: Props) => {
  const d = useDictionaryTranslate("filterSeason")
  return (
    <Wrap>
      {allSeasons.map(season => {
        const selected = season === selectedSeason
        const active = seasons.includes(season)
        return <SeasonItem key={season} season={season} label={d(season)} selected={selected} active={active}
                           onClick={onClick}/>
      })}
    </Wrap>
  )
}

export default Season;