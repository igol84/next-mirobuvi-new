import React, {useContext} from 'react';
import {Box, Flex, Link} from "@chakra-ui/react";
import {IDroppableOrder, IOrder} from "./types";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import NextLink from "next/link";
import {Icon} from "@chakra-ui/icons";
import {AiFillEdit} from "react-icons/ai";
import Product from "./Product";
import {useDroppable} from "@dnd-kit/core";
import Status from "@/components/base/Status/AdminStatus";

interface Props {
  order: IOrder
  draggableProductId: string | null
}

const Order = ({order, draggableProductId}: Props) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("orderList")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const summa = order.orderItems.reduce((total, item) => total + item.quantity * item.price, 0)
  const productIds = order.orderItems.map(item => item.id)
  const droppableOrderData: IDroppableOrder = {productIds}
  const {isOver, setNodeRef} = useDroppable({id: order.id, data: droppableOrderData});
  const isDraggedSameOrder = draggableProductId && productIds.includes(draggableProductId)
  const sx = isOver && !isDraggedSameOrder ? {
    bgColor: 'green.200',
    _dark: {
      bgColor: 'green.500',
    }
  } : {}
  return (
    <Box layerStyle='adminOrderWithItems' boxShadow='2xl' ref={setNodeRef}>
      <Flex layerStyle='adminOrder' sx={sx} direction={{base: "column", md: "row"}}>
        <Flex justifyContent='center' gap={2}>
          №{order.orderNumber}
          <Link as={NextLink} href={`/${lang}/admin/orders/${order.id}`}>
            <Icon as={AiFillEdit} boxSize={6}/>
          </Link>
        </Flex>
        <Box><Status orderId={order.id} status={order.status}/></Box>
        <Box>{order.createdAt.toLocaleString()}</Box>
        <Box>{order.firstName} {order.lastName}</Box>
        <Box>{order.phone}</Box>
        <Box>{order.delivery}</Box>
        {!!order.email && <Box>{order.email}</Box>}
        <Box>{UAHFormat.format(summa)}{d('pricePrefix')}</Box>
      </Flex>
      <Flex direction="column" p={2} gap={2}>
        {order.orderItems.map(item => (
          <Product key={item.id} item={item}/>
        ))}
      </Flex>
    </Box>
  );
};

export default Order;