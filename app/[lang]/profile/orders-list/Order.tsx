import React, {useContext} from 'react';

import {Box, Flex, ListItem, Spacer, Text, UnorderedList} from "@chakra-ui/react";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {useRouter} from "next/navigation";
import {IOrder} from "@/app/[lang]/profile/orders-list/types";
import Status from "@/components/base/Status/Status";


interface Props {
  order: IOrder
}

const Order = ({order}: Props) => {
  const lang = useContext(LangContext)
  let summa = 0
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const d = useDictionaryTranslate("orderList")
  const router = useRouter();
  const onClick = () => {
    router.push(`/${lang}/profile/orders-list/${order.id}`)
  }
  return (
    <Flex direction={{base: "column", md: "row"}} onClick={onClick} layerStyle='ordersInProfile'>
      <Box>
        <Text fontWeight='bold' fontSize={24}>{d('order')} №{order.orderNumber} </Text>
        <Text>{order.createdAt.toLocaleString()}</Text>
      </Box>
      <Box><Status status={order.status}/></Box>
      <Box>
        <Text fontWeight='bold' fontSize={24}>{d('orders')}:</Text>
        <UnorderedList>
          {order.orderItems.map((item, index) => {
            summa += item.quantity * item.price
            const productName = lang === 'en' ? item.productNameEn : item.productNameUa
            const size = item.size ? ' ' + item.size : ''
            return <ListItem key={index}>{productName}{size} — {item.quantity}{d('PC')}</ListItem>
          })}
        </UnorderedList>
      </Box>
      <Spacer/>
      <Box alignSelf='center'>{UAHFormat.format(summa)}{d('pricePrefix')}</Box>
    </Flex>
  );
};

export default Order;