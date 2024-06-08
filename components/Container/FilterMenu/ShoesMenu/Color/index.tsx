import React from 'react';
import {allColors, FilterColor, FilterColorType} from "@/app/[locale]/[urlTag]/types";
import {Wrap} from "@chakra-ui/react";
import ColorItem from "@/components/Container/FilterMenu/ShoesMenu/Color/ColorItem";
import {useTranslations} from "next-intl";

export type ColorType = {
  filterColorType: FilterColorType
  onClick: (color: FilterColor) => void
}

interface Props {
  colorType: ColorType
  onMobileMenuClose?: () => void
}

const Color = ({colorType: {filterColorType: {selectedColor, colors}, onClick}}: Props) => {
  const t = useTranslations('filterColor')
  return (
    <Wrap>
      {allColors.map(color => {
        const selected = color === selectedColor
        const active = colors.includes(color)
        return <ColorItem key={color} color={color} label={t(color)} selected={selected} active={active}
                           onClick={onClick}/>
      })}
    </Wrap>
  )
}

export default Color;