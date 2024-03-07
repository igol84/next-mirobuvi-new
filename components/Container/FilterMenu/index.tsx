import React from 'react';
import {Flex} from "@chakra-ui/react";
import PriceFilter, {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";
import ProductType, {ProductTypeType} from "@/components/Container/FilterMenu/ProductType";
import ShoesMenu, {ShoesMenuType} from "@/components/Container/FilterMenu/ShoesMenu";


export interface FilterMenuProps {
  priceFilterType: PriceFilterType
  productTypeType: ProductTypeType
  shoesMenuType: ShoesMenuType
  onMobileMenuClose?: () => void
}

const FilterMenu = ({priceFilterType, productTypeType, onMobileMenuClose, shoesMenuType}: FilterMenuProps) => {
  const {filterProductType: {productType}} = productTypeType
  const isShoesType = productType === 'shoes'
  return (
    <Flex whiteSpace='nowrap' w={240} gap={3} direction='column'>
      <PriceFilter priceFilterData={priceFilterType} onMobileMenuClose={onMobileMenuClose}/>
      <ProductType productTypeType={productTypeType} onMobileMenuClose={onMobileMenuClose}/>
      {isShoesType && <ShoesMenu shoesMenuType={shoesMenuType}/>}
    </Flex>
  )
}

export default FilterMenu;