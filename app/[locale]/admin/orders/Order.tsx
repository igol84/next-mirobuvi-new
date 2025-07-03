import React from 'react';
import {Box, Divider, Flex, Link} from "@chakra-ui/react";
import {IOrder} from "@/app/[locale]/admin/orders/types";
import NextLink from "next/link";
import {Icon} from "@chakra-ui/icons";
import {AiFillEdit} from "react-icons/ai";
import {BiUser} from 'react-icons/bi';
import Product from "@/app/[locale]/admin/orders/Product";
import Status from "@/components/base/Status/AdminStatus";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";

interface Props {
  order: IOrder
  isUserPage?: boolean
}

const Order = ({order, isUserPage = false}: Props) => {
  const t = useTranslations('orderList')
  const locale = useLocale() as Locale
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const summa = order.orderItems.reduce((total, item) =>
      total + item.quantity * item.price
    , 0)
  return (
    <Box layerStyle='adminOrderWithItems' boxShadow='2xl'>
      <Flex layerStyle='adminOrder' direction={{base: "column", md: "row"}}>
        <Flex justifyContent='center' gap={2}>
          №{order.orderNumber}
          <Link as={NextLink} href={`/${locale}/admin/orders/${order.id}`}>
            <Icon as={AiFillEdit} boxSize={6}/>
          </Link>
          {!!order.userId && !isUserPage && (
            <Link as={NextLink} href={`/${locale}/admin/orders/user/${order.userId}`}>
              <Icon as={BiUser} boxSize={6}/>
            </Link>
          )}
        </Flex>
        <Box><Status orderId={order.id} status={order.status}/></Box>
        <Box>{order.createdAt.toLocaleString()}</Box>
        <Box>{order.firstName} {order.lastName}</Box>
        <Box>{order.phone}</Box>
        <Box>{order.delivery}</Box>
        {!!order.email && <Box>{order.email}</Box>}
        <Box>{UAHFormat.format(summa)}{t('pricePrefix')}</Box>
      </Flex>
      <Divider/>
      <Flex direction="column" p={2} gap={2}>
        {order.orderItems.map((item, index) => (
          <Product key={index} item={item}/>
        ))}
      </Flex>
    </Box>
  );
};

export default Order;