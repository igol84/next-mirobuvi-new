import React from 'react';
import OrdersPage from "@/app/[locale]/profile/orders-list/OrdersPage";
import {getUserOrders} from "@/lib/db/order";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {redirect} from "next/navigation";
import {IOrder, IOrderItem} from "@/app/[locale]/profile/orders-list/types";
import {Locale} from "@/i18n/request";
import {getTranslations} from "next-intl/server";

type Props = {
  params: {
    locale: Locale
  }
}

export async function generateMetadata({ params: {locale} }: Props) {
  const t = await getTranslations({locale, namespace: 'orderList'})
  return {
    title: t('title'),
    description: t('description'),
  }
}


const OrdersListPage = async ({params: {locale}}: Props) => {
  const session = await getServerSession(authOptions)
  if (session) {
    const orders = await getUserOrders(Number(session.user.id))
    
    if (!orders || orders.length === 0) {
      const t = await getTranslations({locale, namespace: 'orderList'})
      return <div>{t('ordersNotFound')}</div>
    }

    const orderData: IOrder[] = orders.map(order => {
      const orderItems: IOrderItem[] = order.orderItems.map(orderItem => ({
        productNameUa: orderItem.productNameUa,
        productNameEn: orderItem.productNameEn,
        price: orderItem.price,
        quantity: orderItem.quantity,
        size: orderItem.size
      }))
      return {
        id: order.id,
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        orderItems: orderItems,
        status: order.status
      }
    })
    return (
      <OrdersPage orders={orderData}/>
    )
  } else {
    redirect(`/api/auth/signin?callbackUrl=/${locale}/profile/orders-list`)
  }
}

export default OrdersListPage;