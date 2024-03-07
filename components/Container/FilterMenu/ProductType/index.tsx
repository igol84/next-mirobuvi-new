import React from 'react';
import {Box} from "@chakra-ui/react";
import Shoes from "./Shoes";
import {FilterProductType, FilterProductTypeType} from "@/app/[lang]/[urlTag]/types";

export type ProductTypeType = {
  filterProductType: FilterProductType
  onChangeType: (selected: FilterProductTypeType) => void
}

interface Props {
  productTypeType: ProductTypeType
  onMobileMenuClose?: () => void
}

const ProductType = ({productTypeType: {filterProductType, onChangeType}, onMobileMenuClose}: Props) => {
  const {productType, hidden} = filterProductType
  const onChangeShoes = (checked: boolean) => {
    onChangeType(checked ? 'shoes' : null)
    onMobileMenuClose && onMobileMenuClose()
  }
  return (
    <Box hidden={hidden}>
      <Shoes isChecked={productType === 'shoes'} onChange={onChangeShoes}/>
    </Box>
  );
};

export default ProductType;