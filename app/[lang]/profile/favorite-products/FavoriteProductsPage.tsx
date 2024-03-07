'use client'
import React from 'react';
import {Box, Heading, Wrap, WrapItem} from "@chakra-ui/react";
import {ProductType} from "@/components/Products/types";
import FavoriteProduct from "@/app/[lang]/profile/favorite-products/FavoriteProduct";
import {useDictionaryTranslate} from "@/dictionaries/hooks";


interface Props {
  products: ProductType[]
  userId: string
}

const FavoriteProductsPage = ({products, userId}: Props) => {
  const d = useDictionaryTranslate("favoriteList")
  return (
    <Box>
      <Heading>{d('heading')}</Heading>
      <Wrap justify={{base: 'center', lg: 'flex-start'}} spacing={[4, 4, 4, 2, 4]}>
        {products.map(product => {
          return (
            <WrapItem key={product.id}>
              <FavoriteProduct product={product} userId={userId}/>
            </WrapItem>
          )
        })}
      </Wrap>
    </Box>
  )

}

export default FavoriteProductsPage;