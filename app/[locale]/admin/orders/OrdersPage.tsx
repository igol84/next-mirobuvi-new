'use client'
import {Box, Flex} from "@chakra-ui/react";
import React from 'react';
import {IOrder} from "./types";
import Order from "./Order";
import PaginationBar, {PaginationBarProps} from "@/components/base/PaginationBar";

interface Props {
  orders: IOrder[]
  pagination: PaginationBarProps
}

const OrdersPage = ({orders, pagination: {currentPage, totalPages}}: Props) => {
  return (
    <Box>
      <Flex pb={2} justifyContent='center'>
        <PaginationBar currentPage={currentPage} totalPages={totalPages}/>
      </Flex>
      {orders.map(order => <Order key={order.id} order={order}/>)}
      <Flex pt={2} justifyContent='center'>
        <PaginationBar currentPage={currentPage} totalPages={totalPages}/>
      </Flex>
    </Box>
  );
};

export default OrdersPage;