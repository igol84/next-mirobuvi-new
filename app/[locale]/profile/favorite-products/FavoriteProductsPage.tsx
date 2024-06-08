'use client'
import React from 'react';
import {Box, Heading, Wrap, WrapItem} from "@chakra-ui/react";
import {ProductType} from "@/components/Products/types";
import FavoriteProduct from "@/app/[locale]/profile/favorite-products/FavoriteProduct";
import {useTranslations} from "next-intl";


interface Props {
  products: ProductType[]
  userId: number
}

const FavoriteProductsPage = ({products, userId}: Props) => {
  const t = useTranslations('favoriteList')
  return (
    <Box>
      <Heading>{t('heading')}</Heading>
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