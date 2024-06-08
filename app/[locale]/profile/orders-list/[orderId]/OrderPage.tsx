'use client'
import React from 'react';
import {Box, Flex, Heading} from "@chakra-ui/react";
import OrderItems from "@/app/[locale]/profile/orders-list/[orderId]/OrderItems";
import {IOrder} from "@/app/[locale]/profile/orders-list/[orderId]/types";
import BreadCrumb from "@/app/[locale]/profile/orders-list/[orderId]/BreadCrumb";
import Status from "@/components/base/Status/Status";
import {useTranslations} from "next-intl";

interface Props {
  order: IOrder
}

const OrderPage = ({order}: Props) => {
  const t = useTranslations('orderList')
  return (
    <Box>
      <BreadCrumb text={`№${order.orderNumber}`}/>
      <Heading>{t('order')} №{order.orderNumber}</Heading>
      <Flex direction='column' layerStyle='orderInProfile' p={{base: 4, sm: 8}}>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>{t('status')}</Box>
          <Box><Status status={order.status}/></Box>
        </Flex>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>{t('firstLastName')}</Box>
          <Box>{order.firstName} {order.lastName}</Box>
        </Flex>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>Е-mail</Box>
          <Box>{order.email}</Box>
        </Flex>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>{t('phoneNumber')}</Box>
          <Box>{order.phone}</Box>
        </Flex>
        <Flex w='full'>
          <Box w={{base: '100px', sm: '200px'}}>{t('delivery')}</Box>
          <Box>{order.delivery}</Box>
        </Flex>
        <OrderItems orderItems={order.orderItems}/>
      </Flex>
    </Box>
  );
};

export default OrderPage;