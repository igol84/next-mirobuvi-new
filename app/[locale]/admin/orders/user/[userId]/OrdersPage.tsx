'use client'
import React, {useState} from 'react';
import Order from "./Order";
import {Avatar, Box, Flex, Spinner, Text} from "@chakra-ui/react";
import {DndContext, DragEndEvent, DragOverEvent} from "@dnd-kit/core";
import {IUser} from "./types";
import {serverActionMoveProductToAnotherOrder} from "./actions";
import {useTranslations} from "next-intl";

interface Props {
  user: IUser
}

const OrdersPage = ({user}: Props) => {
  const t = useTranslations('orderList')
  const summa = user.orders.reduce((total, order) =>
      total + order.orderItems.reduce((total, item) =>
          total + item.quantity * item.price
        , 0)
    , 0)
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const [draggableProductId, setDraggableProductId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const draggedProductId = event.active.id as number
      setDraggableProductId(draggedProductId)
    }
  }
  const moveProductToAnotherOrder = async (productId: number, orderId: number) => {
    setIsLoading(true)
    await serverActionMoveProductToAnotherOrder(productId, orderId)
    setIsLoading(false)
  }
  const handleDragEnd = async (event: DragEndEvent) => {
    if (event.over) {
      const droppedProductId = event.active.id as number
      const overOrderId = event.over.id as number
      const overOrder = user.orders.find(order => order.id === overOrderId)
      if (overOrder) {
        const productIds = overOrder.orderItems.map(item => item.id)
        const isDraggedSameOrder = productIds.includes(droppedProductId)
        if (!isDraggedSameOrder && !isLoading) {
          await moveProductToAnotherOrder(droppedProductId, overOrderId)
        }
      }
    }
  }
  return (
    <Box>
      <Flex alignItems='center' wrap='wrap' gap={[2, 3, 4, 6]} direction={{base: 'column', md: 'row'}}
            justifyContent='center' p={2}>
        <Box width={6}>{isLoading && <Spinner/>}</Box>
        <Avatar name={user.name || ''} src={user.image || undefined} size={'sm'} sx={{cursor: 'pointer'}}/>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text>{t('order2')}: {user.orders.length}</Text>
        <Text>{t('orderTotal')}: {UAHFormat.format(summa)}{t('pricePrefix')}</Text>
      </Flex>
      <Box>
        <DndContext id='orders' onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
          {user.orders.map(order => (
            <Order key={order.id} order={order} draggableProductId={draggableProductId}/>
          ))}
        </DndContext>
      </Box>
    </Box>
  )
}

export default OrdersPage