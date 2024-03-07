import React from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {SimpleProductProps} from "@/components/product/types";
import AddToCartButton from "@/components/product/AddToCartButton";
import dynamic from "next/dynamic";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const Like = dynamic(() => import('@/components/product/Like'), {ssr: false})

type Props = {
  productData: SimpleProductProps
}

const SimpleProduct = ({productData}: Props) => {
  const d = useDictionaryTranslate("product")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const textNotAvailable = d('notAvailable')
  return (
    <>
      <Text fontSize={36}>
        {productData.name}
      </Text>
      <Flex wrap='wrap' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='baseline' color='price'>
          <Text fontSize={64} fontWeight='bold'>
            {UAHFormat.format(productData.price)}
          </Text>
          <Text fontSize={24}>
            {productData.price_prefix}
          </Text>
        </Flex>
        <Like productUrl={productData.product_key}/>
      </Flex>
      {productData.qty > 0 ? (
        <AddToCartButton productId={productData.product_key}/>
      ) : <Text color='red.400'>{textNotAvailable}</Text>}

    </>
  );
};

export default SimpleProduct;