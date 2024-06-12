'use client'
import React, {useContext, useState} from 'react';
import {Flex, HStack, Text} from "@chakra-ui/react";
import {SimpleProductProps} from "@/components/product/types";
import AddToCartButton from "@/components/product/AddToCartButton";
import dynamic from "next/dynamic";
import {IsAdminContext, IsEditorContext} from "@/app/providers";
import PriceEditor from "@/components/product/PriceEditor";
import {useTranslations} from "next-intl";
import Price from "@/components/product/Price";

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
  const defaultPrice = productData.oldPrice ? productData.oldPrice : productData.price
  return (
    <>
      <Text fontSize={36}>{productData.name}</Text>
      {priceEdit && <PriceEditor id={productData.id} defaultPrice={defaultPrice} onClose={onStopEdit}
                                 defaultDiscount={productData.discount}/>}
      <Flex wrap='wrap' alignItems='center' justifyContent='space-between' hidden={priceEdit}>
        <Flex alignItems='baseline' color='price' cursor={isEditAccess ? 'pointer' : 'default'}
              onClick={onPriceClick}>
          <HStack align='baseline'>
            {productData.oldPrice && <Price price={productData.oldPrice} prefix={productData.price_prefix} isOld/>}
            <Price price={productData.price} prefix={productData.price_prefix}/>
          </HStack>
        </Flex>
        <Like productUrl={productData.url}/>
      </Flex>
      {productData.inStock ? (
        <AddToCartButton productId={productData.url}/>
      ) : <Text color='red.400'>{textNotAvailable}</Text>}

    </>
  );
};

export default SimpleProduct;