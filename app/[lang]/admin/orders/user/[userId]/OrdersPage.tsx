'use client'
import React, {useState} from 'react';
import Order from "./Order";
import {Avatar, Box, Flex, Spinner, Text} from "@chakra-ui/react";
import {DndContext, DragEndEvent, DragOverEvent} from "@dnd-kit/core";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {IUser} from "./types";
import {serverActionMoveProductToAnotherOrder} from "./actions";

interface Props {
  user: IUser
}

const OrdersPage = ({user}: Props) => {
  const d = useDictionaryTranslate("orderList")
  const summa = user.orders.reduce((total, order) =>
      total + order.orderItems.reduce((total, item) =>
          total + item.quantity * item.price
        , 0)
    , 0)
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const [draggableProductId, setDraggableProductId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const draggedProductId = event.active.id as string
      setDraggableProductId(draggedProductId)
    }
  }
  const moveProductToAnotherOrder = async (productId: string, orderId: string) => {
    setIsLoading(true)
    await serverActionMoveProductToAnotherOrder(productId, orderId)
    setIsLoading(false)
  }
  const handleDragEnd = async (event: DragEndEvent) => {
    if (event.over) {
      const droppedProductId = event.active.id as string
      const overOrderId = event.over.id as string
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
        <Text>{d('order2')}: {user.orders.length}</Text>
        <Text>{d('orderTotal')}: {UAHFormat.format(summa)}{d('pricePrefix')}</Text>
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