import React from 'react';
import {Wrap} from "@chakra-ui/react";
import {FilterSizesType} from "@/app/[lang]/[urlTag]/types";
import Size from "@/components/Container/FilterMenu/ShoesMenu/Sizes/Size";

export type SizesType = {
  filterSizes: FilterSizesType
  onSelectSize: (size: number) => void
}

interface Props {
  sizesType: SizesType
}

const Sizes = ({sizesType: {filterSizes, onSelectSize}}: Props) => {
  const {sizesAllList, sizesList, selectedSizes} = filterSizes
  return (
    <Wrap>
      {sizesAllList && sizesAllList.map(size => {
        const selected = selectedSizes ? selectedSizes.includes(size) : false
        const active = sizesList.includes(size)
        const onClick = () => {
          if(active) {
              onSelectSize(size)
          }
        }
        return (
          <Size key={size} size={size} selected={selected} active={active} onClick={onClick}/>
        )
      })}
    </Wrap>
  );
};

export default Sizes;