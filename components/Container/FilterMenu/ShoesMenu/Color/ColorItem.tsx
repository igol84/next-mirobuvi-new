import React from 'react';
import {Center} from "@chakra-ui/react";
import {FilterColor} from "@/app/[lang]/[urlTag]/types";


interface Props {
  color: FilterColor
  label: string
  selected: boolean
  active: boolean
  onClick: (color: FilterColor) => void
}

const ColorItem = ({color, selected, label, active, onClick}: Props) => {
  const layerStyle = active ? selected ? 'shoesSizeSelected' : 'shoesSize' : 'shoesSizeEmpty'
  const onClickColor = () => {
    if(active)
      onClick(color)
  }
  return (
    <Center onClick={onClickColor} layerStyle={layerStyle}>
      {label}
    </Center>
  );
};

export default ColorItem;