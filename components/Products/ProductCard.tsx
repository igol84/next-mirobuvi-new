import React from 'react';
import {Center, Flex, Link, Text} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {SimpleProductProps} from "@/components/Products/types";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n";
import Price from "@/components/Products/Price";

type Props = {
  product: SimpleProductProps
}
const ProductCard = ({product}: Props) => {
  const t = useTranslations('product')
  const locale = useLocale() as Locale
  const {name, price, oldPrice, price_prefix, url} = product
  const filter = product.isAvailable ? undefined : 'auto'
  const brightness = product.isAvailable ? undefined : '40%'
  const textNotAvailable = t('notAvailable')
  return (
    <Flex flexDirection='column' gap={4} w={product.page === 'viewed' ? [200, 249] : 249}>
      <Link as={NextLink} href={`/${locale}/products/${url}`} _hover={{color: 'hoverLinkTextColor'}}>
        <ChakraNextImage
          alt={name} borderRadius={[30, 15]} as={NextImage} width={0} height={0} sizes="100vw" filter={filter}
          brightness={brightness} style={{width: '100%', height: 'auto'}}
          src={product.imageUrl}
        />
        <Center><Text>{name}</Text></Center>
        <Flex gap={1} alignItems="center" justifyContent="center">
          {(oldPrice && oldPrice !== price) && <Price price={oldPrice} prefix={price_prefix} isOld/>}
          <Price price={price} prefix={price_prefix}/>
        </Flex>
        <Center>
          {!product.isAvailable && <Text color='red.400'>{textNotAvailable}</Text>}
        </Center>
      </Link>
    </Flex>
  );
};

export default ProductCard;