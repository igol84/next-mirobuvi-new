'use client'
import React from 'react';
import {BrandCardPropsWithFirst} from "@/components/Brands/types";
import BreadCrumb from "@/components/base/BreadCrumb";
import Brands from "@/components/Brands";
import {Box} from "@chakra-ui/react";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {ProductType} from "@/components/Products/types";
import {useBrandCrumbs} from "@/app/[lang]/brands/hooks";

interface Props {
  brands: BrandCardPropsWithFirst[]
  viewedProducts: ProductType[]
  isAdmin: boolean
}

const BrandPage = ({brands, viewedProducts, isAdmin}: Props) => {
  const breadCrumbs = useBrandCrumbs()
  return (
    <>
      <Box display='flex' justifyContent='space-between' flexWrap='wrap' alignItems="center" pb={[2, 4]}>
        <BreadCrumb breadCrumbs={breadCrumbs}/>
      </Box>
      <Brands brands={brands} isAdmin={isAdmin}/>
      {viewedProducts.length > 0 && (
        <Box pt={4}>
          <ViewedProducts viewedProducts={viewedProducts}/>
        </Box>
      )}
    </>
  );
};

export default BrandPage;