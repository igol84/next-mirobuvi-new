import React from 'react'
import {Box, Flex, Heading} from "@chakra-ui/react"
import {IOrderItem} from "@/app/[lang]/admin/orders/[orderId]/types"
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import ItemEditor from "@/app/[lang]/admin/orders/[orderId]/ItemEditor";

interface Props {
  orderItems: IOrderItem[]
}

const OrderItemsEditor = ({orderItems}: Props) => {
  const d = useDictionaryTranslate("orderForm")
  let sum = 0
  return (
    <Box>
      <Heading as='h2' sx={{pb: 6}}>{d('products')}</Heading>
      <Flex direction='column' gap={2}>
        {orderItems.map((item, index) => {
          sum += item.quantity * item.price
          return (
            <ItemEditor key={index} orderItem={item}/>
          )
        })}
      </Flex>
    </Box>
  )
}

export default OrderItemsEditor