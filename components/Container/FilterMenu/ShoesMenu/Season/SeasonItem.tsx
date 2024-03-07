import React from 'react';
import {Center} from "@chakra-ui/react";
import {FilterSeason} from "@/app/[lang]/[urlTag]/types";


interface Props {
  season: FilterSeason
  label: string
  selected: boolean
  active: boolean
  onClick: (season: FilterSeason) => void
}

const SeasonItem = ({season, selected, label, active, onClick}: Props) => {
  const layerStyle = active ? selected ? 'shoesSizeSelected' : 'shoesSize' : 'shoesSizeEmpty'
  const onClickSeason = () => {
    if(active)
      onClick(season)
  }
  return (
    <Center onClick={onClickSeason} layerStyle={layerStyle}>
      {label}
    </Center>
  );
};

export default SeasonItem;