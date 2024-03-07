import React from 'react';
import {Center} from "@chakra-ui/react";

interface Props {
  size: number
  selected: boolean
  active: boolean
  onClick: () => void
}

const Size = ({size, selected, active, onClick}: Props) => {
  const layerStyle = active ? selected ? 'shoesSizeSelected' : 'shoesSize' : 'shoesSizeEmpty'
  return (
    <Center w={10} h={10}  layerStyle={layerStyle} onClick={onClick}>
      {size}
    </Center>
  )
}

export default Size;