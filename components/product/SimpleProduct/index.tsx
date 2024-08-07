'use client'
import React, {useContext, useState} from 'react';
import {Box, Flex, HStack, Text} from "@chakra-ui/react";
import {SimpleProductProps} from "@/components/product/types";
import AddToCartButton from "@/components/product/AddToCartButton";
import dynamic from "next/dynamic";
import {IsAdminContext, IsEditorContext} from "@/app/providers";
import PriceEditor from "@/components/product/PriceEditor";
import {useTranslations} from "next-intl";
import Price from "@/components/product/Price";
import GroupOfLikeProducts from "@/components/product/GroupOfLikeProducts";

const Like = dynamic(() => import('@/components/product/Like'), {ssr: false})

type Props = {
  productData: SimpleProductProps
}

const SimpleProduct = ({productData}: Props) => {
  const isAdmin = useContext(IsAdminContext)
  const isEditor = useContext(IsEditorContext)
  const isEditAccess = isAdmin || isEditor
  const t = useTranslations('product')
  const textNotAvailable = t('notAvailable')
  const [priceEdit, setPriceEdit] = useState(false)

  const onPriceClick = isEditAccess ? () => {
    setPriceEdit(true)
  } : () => undefined


  function onStopEdit() {
    setPriceEdit(false)
  }

  const defaultPrice = productData.defaultPrice
  return (
    <>
      <Text fontSize={36}>{productData.name}</Text>
      {priceEdit && <PriceEditor id={productData.id} defaultPrice={defaultPrice} onClose={onStopEdit}
                                 defaultDiscount={productData.discount}/>}
      <Flex wrap='wrap' alignItems='center' justifyContent='space-between' hidden={priceEdit}>
        <Flex alignItems='baseline' color='price'>
          <HStack align='baseline' cursor={isEditAccess ? 'pointer' : 'default'}
                  onClick={onPriceClick}>
            {productData.oldPrice && productData.oldPrice !== productData.price &&
              <Price price={productData.oldPrice} prefix={productData.price_prefix} isOld/>}
            <Price price={productData.price} prefix={productData.price_prefix}/>
          </HStack>
        </Flex>
        <Like productUrl={productData.url}/>
      </Flex>
      {productData.inStock ? (
        <Box>
          <Box pb={6} color='secondary'>{t('prepayment')}</Box>
          <AddToCartButton productId={productData.url}/>
        </Box>
      ) : <Text color='red.400'>{textNotAvailable}</Text>}
      <GroupOfLikeProducts products={productData.similarProducts}/>
    </>
  );
};

export default SimpleProduct;