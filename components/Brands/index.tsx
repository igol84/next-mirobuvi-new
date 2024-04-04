'use client'
import React from 'react';
import {Box, Button, Wrap, WrapItem} from "@chakra-ui/react";
import BrandCard from "@/components/Brands/BrandCard";
import {BrandCardPropsWithFirst} from "@/components/Brands/types";


type Props = {
  brands: BrandCardPropsWithFirst[]
  isAdmin: boolean
}

const Brands = ({brands, isAdmin}: Props) => {
  return (
    <>
      {isAdmin && (
        <Box>
          <Button>Add</Button>
        </Box>
      )}
      <Wrap align='center' justify={{base: 'center', lg: 'flex-start'}} spacing={[4, 4, 4, 2, 4]}>
        {brands.map(brand => (
          <WrapItem key={brand.url}>
            <article>
              <BrandCard isFirst={brand.isFirst} brandId={brand.brandId} brandName={brand.brandName} url={brand.url}
                         imgUrl={brand.imgUrl} isAdmin={isAdmin}/>
            </article>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default Brands;