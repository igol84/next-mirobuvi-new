import React from 'react';
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import OrderForm from "@/app/[lang]/admin/orders/[orderId]/OrderForm";
import {getOrder} from "@/lib/db/order";
import {IOrder, IOrderItem} from "./types";
import {getProductData} from "@/app/api/fetchFunctions";

type Props = {
  params: {
    orderId: string
    lang: Lang
  }
}

export async function generateMetadata({params: {lang, orderId}}: Props) {
  const dict = await getDictionary(lang)
  return {
    title: `${dict.orderList.order} №${orderId}`,
    description: `${dict.orderList.order} №${orderId}`,
  }
}

const Page = async ({params: {orderId}}: Props) => {
  const order = await getOrder(orderId)
  const orderItems: IOrderItem[] = []
  if (order) {
    for (const item of order.orderItems) {
      const productData = await getProductData(item.productId)
      if (productData) {
        orderItems.push({
          productId: item.id,
          productNameUa: item.productNameUa,
          productNameEn: item.productNameEn,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          url: productData.url,
          imgUrl: productData.product_key
        })
      }
    }
    const orderData: IOrder = {
      id: order.id,
      orderItems: orderItems,
      createdAt: order.createdAt,
      firstName: order.firstName,
      lastName: order.lastName,
      orderNumber: order.orderNumber,
      delivery: order.delivery,
      email: order.email ? order.email : '',
      phone: order.phone,
      status: order.status
    }
    return <OrderForm orderData={orderData}/>
  }
}
export default Page