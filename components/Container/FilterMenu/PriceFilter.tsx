import React from 'react';
import {Box, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text} from "@chakra-ui/react";
import {usePricePrefix} from "@/lib/hooks";
import _ from "lodash";
import {useTranslations} from "next-intl";

export type PriceFilterType = {
  minInitial: number
  min: number
  onMinChange: (min: number) => void
  maxInitial: number
  max: number
  onMaxChange: (max: number) => void
  onSubmit: (value: number[]) => void
}

export interface PriceFilterProps {
  priceFilterData: PriceFilterType
  onMobileMenuClose?: () => void
}

const PriceFilter = ({priceFilterData, onMobileMenuClose}: PriceFilterProps) => {
  const {minInitial, min, onMinChange, maxInitial, max, onMaxChange, onSubmit} = priceFilterData
  const t = useTranslations()
  const pricePrefix = usePricePrefix()
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const minPrice = UAHFormat.format(min)
  const maxPrice = UAHFormat.format(max)
  const headerText = `${minPrice}${pricePrefix} - ${maxPrice}${pricePrefix}`

  const onChange = (value: number[]) => {
    onMinChange(value[0])
    onMaxChange(value[1])
  }
  const getAriaValueText = (index: number) => {
    return index === 0 ? t('filter.minPrice') : t('filter.maxPrice')
  }

  const onChangeEnd = (value: number[]) => {
    onMobileMenuClose && onMobileMenuClose()
    onSubmit(value)
  }

  return (
    <Box>
      <Text>{_.upperFirst(t('global.price'))}: {headerText}</Text>
      <Box>
        <RangeSlider getAriaValueText={getAriaValueText} value={[min, max]} onChange={onChange} min={minInitial}
                     max={maxInitial} step={10} onChangeEnd={onChangeEnd}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack/>
          </RangeSliderTrack>
          <RangeSliderThumb index={0}/>
          <RangeSliderThumb index={1}/>
        </RangeSlider>
      </Box>
    </Box>
  );
};

export default PriceFilter;