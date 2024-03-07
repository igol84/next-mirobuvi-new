import React from 'react';
import OrdersPage from "@/app/[lang]/profile/orders-list/OrdersPage";
import {getUserOrders} from "@/lib/db/order";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {redirect} from "next/navigation";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {IOrder, IOrderItem} from "@/app/[lang]/profile/orders-list/types";

type Props = {
  params: {
    lang: Lang
  }
}

export async function generateMetadata({ params: {lang} }: Props) {
  const dict = await getDictionary(lang)
  return {
    title: dict.orderList.title,
    description:dict.orderList.description,
  }
}


const OrdersListPage = async ({params: {lang}}: Props) => {
  const session = await getServerSession(authOptions)
  if (session) {
    const orders = await getUserOrders(session.user.id)
    if (!orders || orders.length === 0) {
      const dict = await getDictionary(lang)
      return <div>{dict.orderList.ordersNotFound}</div>
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
    redirect(`/api/auth/signin?callbackUrl=/${lang}/profile/orders-list`)
  }
}

export default OrdersListPage;