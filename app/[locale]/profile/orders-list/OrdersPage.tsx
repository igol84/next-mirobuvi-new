'use client'
import React from 'react';
import {Box, Heading, VStack} from "@chakra-ui/react";
import Order from "@/app/[locale]/profile/orders-list/Order";
import {IOrder} from "@/app/[locale]/profile/orders-list/types";
import {useTranslations} from "next-intl";

interface Props {
  orders: IOrder[]
}

const OrdersPage = ({orders}: Props) => {
  const t = useTranslations('orderList')
  return (
    <Box>
      <Heading pb={4}>{t('orders')}</Heading>
      <VStack>
        {orders.map(order => <Order key={order.id} order={order}/>)}
      </VStack>
    </Box>
  );
};

export default OrdersPage;