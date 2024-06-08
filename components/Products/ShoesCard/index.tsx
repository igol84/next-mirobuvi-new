import React from 'react';
import {Center, Flex, Link, Text} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {ShoesType} from "@/components/Products/types";
import Sizes from "@/components/Products/ShoesCard/Sizes";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n";

type Props = {
  product: ShoesType
}

const ShoesCard = ({product}: Props) => {
  const t = useTranslations('product')
  const locale = useLocale() as Locale
  const textNotAvailable = t('notAvailable')
  const {name, price, price_prefix, sizes, url} = product
  let UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const filter = product.isAvailable ? undefined : 'auto'
  const brightness = product.isAvailable ? undefined : '40%'
  return (
    <Flex flexDirection='column' gap={4} w={249}>
      <Link as={NextLink} href={`/${locale}/products/${url}`} _hover={{color: 'hoverLinkTextColor'}}>
        <ChakraNextImage
          borderRadius={[30, 15]} as={NextImage} width={249} height={249} alt={name} filter={filter}
          brightness={brightness}
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
          {product.isAvailable ? <Sizes sizes={sizes}/> : <Text color='red.400'>{textNotAvailable}</Text>}
        </Center>
      </Link>
    </Flex>
  );
};

export default ShoesCard;