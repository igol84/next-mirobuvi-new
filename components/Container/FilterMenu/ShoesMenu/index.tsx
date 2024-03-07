import React from 'react';
import {Divider, Flex} from "@chakra-ui/react";
import Sizes, {SizesType} from "@/components/Container/FilterMenu/ShoesMenu/Sizes";
import Gender, {GenderType} from "@/components/Container/FilterMenu/ShoesMenu/Gender";
import Color, {ColorType} from "@/components/Container/FilterMenu/ShoesMenu/Color";
import Season, {SeasonType} from "@/components/Container/FilterMenu/ShoesMenu/Season";


export type ShoesMenuType = {
  sizesType: SizesType
  genderType: GenderType
  colorType: ColorType
  seasonType: SeasonType
}

export interface ShoesMenuProps {
  shoesMenuType: ShoesMenuType
}

const ShoesMenu = ({shoesMenuType}: ShoesMenuProps) => {
  return (
    <Flex gap={3} direction='column'>
      <Gender genderType={shoesMenuType.genderType}/>
      <Divider/>
      <Season seasonType={shoesMenuType.seasonType}/>
      <Divider/>
      <Color colorType={shoesMenuType.colorType}/>
      <Divider/>
      <Sizes sizesType={shoesMenuType.sizesType}/>
    </Flex>
  )
}

export default ShoesMenu;