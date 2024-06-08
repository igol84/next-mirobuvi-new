import React from 'react';
import OrderPage from "@/app/[locale]/profile/orders-list/[orderId]/OrderPage";
import {getOrder} from "@/lib/db/order";
import {IOrder, IOrderItem} from "@/app/[locale]/profile/orders-list/[orderId]/types";
import {getProductByUrl} from "@/lib/db/product";
import {getProductImageUrl} from "@/lib/productCardData";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";

type Props = {
  params: {
    orderId: string
    locale: Locale
  }
}

export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslations({locale, namespace: 'orderList'})
  return {
    title: t('title'),
    description: t('description'),
  }
}


async function orderPage({params: {orderId, locale}}: Props) {
  const order = await getOrder(Number(orderId))
  const orderItems: IOrderItem[] = []
  if (order) {
    for (const item of order.orderItems) {
      const productData = await getProductByUrl(item.productId)
      if (productData) {
        const imgUrl = getProductImageUrl(productData.url, productData.imgUpdatedAt?.getTime())
        orderItems.push({
          productNameUa: item.productNameUa,
          productNameEn: item.productNameEn,
          size: item.size,
          price: item.price,
          url: productData.url,
          quantity: item.quantity,
          imgUrl
        })
      }
    }
    const orderData: IOrder = {
      orderItems: orderItems,
      firstName: order.firstName,
      lastName: order.lastName,
      orderNumber: order.orderNumber,
      delivery: order.delivery,
      email: order.email ? order.email : '',
      phone: `0${order.phone}`,
      status: order.status
    }
    return (
      <OrderPage order={orderData}/>
    )
  }
  const t = await getTranslations({locale, namespace: 'orderList'})
  return <div>{t('orderNotFound')}</div>
}

export default orderPage;