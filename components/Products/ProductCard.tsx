import React from 'react';
import {Center, Flex, Link, Text} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {SimpleProductProps} from "@/components/Products/types";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n";

type Props = {
  product: SimpleProductProps
}
const ProductCard = ({product}: Props) => {
  const t = useTranslations('product')
  const locale = useLocale() as Locale
  const {name, price, price_prefix, url} = product
  let UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const filter = product.isAvailable ? undefined : 'auto'
  const brightness = product.isAvailable  ? undefined : '40%'
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
        <Center alignItems='baseline' color='price'>
          <Text fontSize={24} fontWeight='bold'>
            {UAHFormat.format(price)}
          </Text>
          <Text fontSize={16}>{price_prefix}</Text>
        </Center>
        <Center>
          {!product.isAvailable && <Text color='red.400'>{textNotAvailable}</Text>}
        </Center>
      </Link>
    </Flex>
  );
};

export default ProductCard;