'use client'
import React from 'react';
import {Center, Flex, Heading, Text, Wrap, WrapItem} from "@chakra-ui/react";
import Product from "@/components/Products/Product";
import {ProductType} from "@/components/Products/types";
import PaginationBar, {PaginationBarProps} from "@/components/base/PaginationBar";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {BrandProps} from "@/components/Brands/types";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";

interface Props {
  products: ProductType[]
  brandData?: BrandProps
  paginationBar?: PaginationBarProps
}

const ProductsList = ({products, brandData, paginationBar}: Props) => {
  const d = useDictionaryTranslate("home")
  if (products.length === 0) {
    return <Heading>{d('notFound')}</Heading>
  }
  return (
    <Flex flexDirection='column' gap={4} pb={{base: 4, sm: 0}}>
      <Wrap justify={{base: 'center', lg: 'flex-start'}} spacing={[0, 0, 0, 1, 0]}>
        {!!brandData && (
          <WrapItem flexDirection="column" p={[1, 1, 1, 0, 1]}>
            <ChakraNextImage
              as={NextImage} borderRadius={[30, 15]} width={249} height={249} alt={`brand ${brandData.brandName}`}
              src={`https://mirobuvi.com.ua/ftp_brands/${brandData.brandId}.jpg`} priority={true}
            />
            <Center width={249}><Text fontSize='2rem' fontWeight='bold'>{brandData.brandName}</Text></Center>
          </WrapItem>
        )}
        {products.map(product => {
          return (
            <WrapItem key={product.id}>
              <article>
                <Product product={product}/>
              </article>
            </WrapItem>
          )
        })}
      </Wrap>
      {paginationBar && (
        <Flex w='full' justifyContent='center'>
          <PaginationBar currentPage={paginationBar.currentPage} totalPages={paginationBar.totalPages}/>
        </Flex>
      )}
    </Flex>

  );
};

export default ProductsList;