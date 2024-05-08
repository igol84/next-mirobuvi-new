'use client'
import React, {useContext, useState} from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {SimpleProductProps} from "@/components/product/types";
import AddToCartButton from "@/components/product/AddToCartButton";
import dynamic from "next/dynamic";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {IsAdminContext, IsEditorContext} from "@/app/providers";
import PriceEditor from "@/components/product/PriceEditor";

const Like = dynamic(() => import('@/components/product/Like'), {ssr: false})

type Props = {
  productData: SimpleProductProps
}

const SimpleProduct = ({productData}: Props) => {
  const isAdmin = useContext(IsAdminContext)
  const isEditor = useContext(IsEditorContext)
  const isEditAccess = isAdmin || isEditor
  const d = useDictionaryTranslate("product")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const textNotAvailable = d('notAvailable')
  const [priceEdit, setPriceEdit] = useState(false)

  const onPriceClick = isEditAccess ? () => {
    setPriceEdit(true)
  } : () => undefined


  function onStopEdit() {
    setPriceEdit(false)
  }

  return (
    <>
      <Text fontSize={36}>{productData.name}</Text>
      {priceEdit && <PriceEditor id={productData.id} defaultPrice={productData.price} onClose={onStopEdit}/>}
      <Flex wrap='wrap' alignItems='center' justifyContent='space-between' hidden={priceEdit}>
        <Flex alignItems='baseline' color='price' cursor={isEditAccess ? 'pointer' : 'default'}
              onClick={onPriceClick}>
          <Text fontSize={64} fontWeight='bold'>
            {UAHFormat.format(productData.price)}
          </Text>
          <Text fontSize={24}>{productData.price_prefix}</Text>
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