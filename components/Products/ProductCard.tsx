import React, {useContext} from 'react';
import {Center, Flex, Link, Text} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {LangContext} from "@/locale/LangProvider";
import {SimpleProductProps} from "@/components/Products/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

type Props = {
  product: SimpleProductProps
}
const ProductCard = ({product}: Props) => {
  const d = useDictionaryTranslate("product")
  const {name, product_key, price, price_prefix, url} = product
  const lang = useContext(LangContext)
  let UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const filter = product.qty > 0 ? undefined : 'auto'
  const brightness = product.qty > 0 ? undefined : '40%'
  const textNotAvailable = d('notAvailable')
  return (
    <Flex flexDirection='column' gap={4} w={product.page === 'viewed' ? [200, 249] : 249}>
      <Link as={NextLink} href={`/${lang}/products/${url}`} _hover={{color: 'hoverLinkTextColor'}}>
        <ChakraNextImage
          alt={name} borderRadius={[30, 15]} as={NextImage} width={0} height={0} sizes="100vw" filter={filter}
          brightness={brightness} style={{width: '100%', height: 'auto'}}
          src={`https://mirobuvi.com.ua/ftp_products/${product_key}/02.jpg`}
        />
        <Center><Text>{name}</Text></Center>
        <Center alignItems='baseline' color='price'>
          <Text fontSize={24} fontWeight='bold'>
            {UAHFormat.format(price)}
          </Text>
          <Text fontSize={16}>{price_prefix}</Text>
        </Center>
        <Center>
          {product.qty === 0 && <Text color='red.400'>{textNotAvailable}</Text>}
        </Center>
      </Link>
    </Flex>
  );
};

export default ProductCard;