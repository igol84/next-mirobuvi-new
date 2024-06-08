import React from 'react';
import {Box, Flex, Link, Text} from "@chakra-ui/react";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {IOrderItem} from "@/app/[locale]/profile/orders-list/[orderId]/types";
import NextLink from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n";

interface Props {
  orderItem: IOrderItem
}

const OrderItem = ({orderItem}: Props) => {
  const t = useTranslations('orderList')
  const locale = useLocale() as Locale
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const productName = locale === 'en' ? orderItem.productNameEn : orderItem.productNameUa

  const size = orderItem.size ? ' ' + orderItem.size : ''
  return (
    <Flex p={4} gap={8} w='full' direction={{base: "column", sm: "row"}} sx={{borderWidth: '1px 0 0 0'}}>
      <Box w={{base: 200, sm: 320}}>
        <Link
          as={NextLink} href={`/${locale}/products/${orderItem.url}`}
          _hover={{color: 'hoverLinkTextColor'}}
        >
          <ChakraNextImage
            as={NextImage} src={orderItem.imgUrl}
            alt={'image'} width={0} height={0} sizes="100vw" borderRadius={[30, 15]}
            style={{width: '100%', height: 'auto'}}
          />

        </Link>
      </Box>
      <Flex w='full' direction="column">
        <Box>{productName}{size}</Box>
        <Box>{UAHFormat.format(orderItem.price)}{t('pricePrefix')} × {orderItem.quantity} = {' '}
          <Text as='span' fontWeight='bold'>
            {UAHFormat.format(orderItem.price * orderItem.quantity)}{t('pricePrefix')}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default OrderItem;