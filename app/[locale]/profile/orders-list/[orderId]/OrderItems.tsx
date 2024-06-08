import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";

import OrderItem from "./OrderItem";
import {IOrderItem} from "./types";
import {useTranslations} from "next-intl";

interface Props {
  orderItems: IOrderItem[]
}

const OrderItems = ({orderItems}: Props) => {
  const t = useTranslations('orderList')
  let summa = 0
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  return (
    <Flex direction='column' w='full' layerStyle='orderDetail'>
      <Box p={4} >{t('yourOrder')}</Box>
      {orderItems.map((orderItem, index) => {
        summa += orderItem.price * orderItem.quantity
        return <OrderItem key={index} orderItem={orderItem}/>
      })}
      <Flex p={4} w='full' gap={8} justifyContent='end' sx={{borderWidth: '1px 0 0 0'}}>
        <Box>
          <Text>{t('inTotal')}: {' '}</Text>
          <Text fontSize={24} fontWeight='bold' display='inline'>
            {UAHFormat.format(summa)}{t('pricePrefix')}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default OrderItems;