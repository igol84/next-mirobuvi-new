import React from 'react';
import {Box, Flex, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {formatPrice} from "@/lib/format";
import {ProductCart} from "@/lib/server/cart/cartFunctions";
import ButtonMinus from "@/components/Container/Navbar/Cart/ButtonMinus";
import ButtonPlus from "@/components/Container/Navbar/Cart/ButtonPlus";
import ButtonTrash from "@/components/Container/Navbar/Cart/ButtonTrash";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";

interface Props {
  cartItem: ProductCart
}

const CartItem = ({cartItem}: Props) => {
  const t = useTranslations('global')
  const locale = useLocale() as Locale
  return (
    <Flex gap={2}>
      <Flex alignItems={'center'}>
        <ButtonTrash productId={cartItem.url} size={cartItem.size}/>
        <Link as={NextLink} href={`/${locale}/products/${cartItem.url}`}>
          <ChakraNextImage as={NextImage} src={cartItem.img} alt={cartItem.name} width={0} height={0}
                           sizes="100vw" style={{width: '100%', height: 'auto'}}
          />
        </Link>
      </Flex>
      <Flex flexDirection={'column'}>
        <Box textOverflow={'ellipsis'} display={'block'} overflow={'hidden'} maxHeight={12} w={200}>
          <Link as={NextLink} href={`/${locale}/products/${cartItem.url}`}>
            {cartItem.name}
          </Link>
        </Box>
        {!!cartItem.size && (
          <Box> {cartItem.size}</Box>
        )}
        <Box>{formatPrice(cartItem.price, locale)}/{t('piece')}</Box>
        <Flex justifyContent={'space-between'} alignItems={'center'} pr={1}>
          <Flex alignItems={'center'} gap={4}>
            <ButtonMinus productId={cartItem.url} size={cartItem.size}/>
            {cartItem.quantity}
            <ButtonPlus productId={cartItem.url} size={cartItem.size}/>
          </Flex>
          <Box>{formatPrice(cartItem.price * cartItem.quantity, locale)}</Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;