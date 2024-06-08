import React from 'react';
import {Box, Flex, ListItem, Spacer, Text, UnorderedList} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import {IOrder} from "@/app/[locale]/profile/orders-list/types";
import Status from "@/components/base/Status/Status";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n";


interface Props {
  order: IOrder
}

const Order = ({order}: Props) => {
  const t = useTranslations('orderList')
  const locale = useLocale() as Locale
  let summa = 0
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const router = useRouter();
  const onClick = () => {
    router.push(`/${locale}/profile/orders-list/${order.id}`)
  }
  return (
    <Flex direction={{base: "column", md: "row"}} onClick={onClick} layerStyle='ordersInProfile'>
      <Box>
        <Text fontWeight='bold' fontSize={24}>{t('order')} №{order.orderNumber} </Text>
        <Text>{order.createdAt.toLocaleString()}</Text>
      </Box>
      <Box><Status status={order.status}/></Box>
      <Box>
        <Text fontWeight='bold' fontSize={24}>{t('orders')}:</Text>
        <UnorderedList>
          {order.orderItems.map((item, index) => {
            summa += item.quantity * item.price
            const productName = locale === 'en' ? item.productNameEn : item.productNameUa
            const size = item.size ? ' ' + item.size : ''
            return <ListItem key={index}>{productName}{size} — {item.quantity}{t('PC')}</ListItem>
          })}
        </UnorderedList>
      </Box>
      <Spacer/>
      <Box alignSelf='center'>{UAHFormat.format(summa)}{t('pricePrefix')}</Box>
    </Flex>
  );
};

export default Order;