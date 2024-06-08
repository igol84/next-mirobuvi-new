import React from 'react'
import {Box, Flex, Heading} from "@chakra-ui/react"
import {IOrderItem} from "@/app/[locale]/admin/orders/[orderId]/types"
import ItemEditor from "@/app/[locale]/admin/orders/[orderId]/ItemEditor";
import {useTranslations} from "next-intl";

interface Props {
  orderItems: IOrderItem[]
}

const OrderItemsEditor = ({orderItems}: Props) => {
  const t = useTranslations('orderForm')
  let sum = 0
  return (
    <Box>
      <Heading as='h2' sx={{pb: 6}}>{t('products')}</Heading>
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