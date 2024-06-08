import React from 'react';
import OrderForm from "@/app/[locale]/admin/orders/[orderId]/OrderForm";
import {getOrder} from "@/lib/db/order";
import {IOrder, IOrderItem} from "./types";
import {getProductByUrl} from "@/lib/db/product";
import {getProductImageUrl} from "@/lib/productCardData";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";

type Props = {
  params: {
    orderId: string
    locale: Locale,
  }
}

export async function generateMetadata({params: {locale, orderId}}: Props) {
  const t = await getTranslations({locale, namespace: 'orderList'})
  return {
    title: `${t('order')} №${orderId}`,
    description: `${t('order')} №${orderId}`,
  }
}

const Page = async ({params: {orderId}}: Props) => {
  const order = await getOrder(Number(orderId))
  const orderItems: IOrderItem[] = []
  if (order) {
    for (const item of order.orderItems) {
      const productData = await getProductByUrl(item.productId)
      if (productData) {
        const imgUrl =  getProductImageUrl(productData.url, productData.imgUpdatedAt?.getTime())
        orderItems.push({
          productId: item.id,
          productNameUa: item.productNameUa,
          productNameEn: item.productNameEn,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          url: productData.url,
          imgUrl
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