import React from 'react';
import OrderPage from "@/app/[lang]/profile/orders-list/[orderId]/OrderPage";
import {getOrder} from "@/lib/db/order";
import {getProductData} from "@/app/api/fetchFunctions";
import {IOrder, IOrderItem} from "@/app/[lang]/profile/orders-list/[orderId]/types";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";

export async function generateMetadata({ params: {lang} }: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.orderList.title,
    description:dict.orderList.description,
  }
}

type Props = {
  params: {
    orderId: string
    lang: Lang
  }
}

async function orderPage({params: {orderId, lang}}: Props) {
  const order = await getOrder(orderId)
  const orderItems: IOrderItem[] = []
  if (order) {
    for (const item of order.orderItems) {
      const productData = await getProductData(item.productId)
      if (productData) {
        orderItems.push({
          productNameUa: item.productNameUa,
          productNameEn: item.productNameEn,
          size: item.size,
          price: item.price,
          url: productData.url,
          quantity: item.quantity,
          imgUrl: productData.product_key
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
  const dict = await getDictionary(lang)
  return <div>{dict.orderList.orderNotFound}</div>
}

export default orderPage;