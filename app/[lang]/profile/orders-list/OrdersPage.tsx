'use client'
import React from 'react';
import {Box, Heading, VStack} from "@chakra-ui/react";
import Order from "@/app/[lang]/profile/orders-list/Order";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {IOrder} from "@/app/[lang]/profile/orders-list/types";

interface Props {
  orders: IOrder[]
}

const OrdersPage = ({orders}: Props) => {
  const d = useDictionaryTranslate("orderList")
  return (
    <Box>
      <Heading pb={4}>{d('orders')}</Heading>
      <VStack>
        {orders.map(order => <Order key={order.id} order={order}/>)}
      </VStack>
    </Box>
  );
};

export default OrdersPage;