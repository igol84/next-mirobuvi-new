'use client'
import React from 'react';
import {ProductType} from "@/components/Products/types";
import {Center, Text, Wrap, WrapItem} from "@chakra-ui/react";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {BrandProps} from "@/components/Brands/types";
import Product from "@/components/Products/Product";


type Props = {
  brandData?: BrandProps
  productsData: ProductType[]
}

const Products = ({brandData, productsData}: Props) => {
  return (
    <Wrap justify={{base: 'center', lg: 'flex-start'}} spacing={[0, 0, 0, 1, 0]}>
      {!!brandData && (
        <WrapItem flexDirection="column" p={[1, 1, 1, 0, 1]}>
          <ChakraNextImage
            as={NextImage} borderRadius={[30, 15]} width={249} height={249} alt={brandData.brandName}
            src={`https://mirobuvi.com.ua/ftp_brands/${brandData.brandId}.jpg`} priority={true}
          />
          <Center width={249}><Text fontSize='2rem' fontWeight='bold'>{brandData.brandName}</Text></Center>
        </WrapItem>
      )}
      {productsData.map(product => {
        return (
          <WrapItem key={product.id}>
            <article>
              <Product product={product}/>
            </article>
          </WrapItem>
        )
      })}
    </Wrap>
  );
};

export default Products;