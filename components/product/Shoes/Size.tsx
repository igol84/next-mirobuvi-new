import React from 'react';
import {Box} from "@chakra-ui/react";
import {SizeType} from "@/components/product/types";


type Props = {
  sizeData: SizeType
  selected: boolean
  onClickSize: (size: number, length: number | null) => void
  onHoverSize: (size: number) => void
  onLiveSize: () => void
}

const Size = ({sizeData, selected, onClickSize, onHoverSize, onLiveSize}: Props) => {
  const layerStyle = sizeData.inStock ? selected ? 'shoesSizeSelected' : 'shoesSize' : 'shoesSizeEmpty'
  const onClick = () => sizeData.inStock ? onClickSize(sizeData.size, sizeData.length) : () => undefined
  const onHover = () => onHoverSize(sizeData.size)
  return (
    <Box layerStyle={layerStyle} onClick={onClick} onMouseEnter={onHover} onMouseLeave={onLiveSize}>
      {sizeData.size}
    </Box>
  );
};

export default Size;