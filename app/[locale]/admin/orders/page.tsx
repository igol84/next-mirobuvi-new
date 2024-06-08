import React from 'react';
import OrdersPage from "./OrdersPage";
import {getOrders, getTotalOrderCount} from "@/lib/db/order";
import {IOrder, IOrderItem} from "./types";
import {getProductByUrl} from "@/lib/db/product";
import {getProductImageUrl} from "@/lib/productCardData";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";

interface Props {
  searchParams: { page?: string };
  params: {
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


const pageSize = 6
const Page = async ({params: {locale}, searchParams: {page = "1"}}: Props) => {
  const t = await getTranslations({locale, namespace: 'orderList'})
  const currentPage = parseInt(page)
  const totalOrderCount = await getTotalOrderCount()
  const totalPages = Math.ceil(totalOrderCount / pageSize)
  const ordersData = await getOrders(currentPage, pageSize)
  if (!ordersData || ordersData.length === 0)
    return <div>{t('ordersNotFound')}</div>
  const orders: IOrder[] = []

  for (const order of ordersData) {
    const orderItems: IOrderItem[] = []
    for (const item of order.orderItems) {
      const productData = await getProductByUrl(item.productId)
      if (productData) {
        const imgUrl = getProductImageUrl(productData.url, productData.imgUpdatedAt?.getTime())
        orderItems.push({
          id: item.id,
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
    orders.push({
      id: order.id,
      userId: order.userId ? order.userId : null,
      createdAt: order.createdAt,
      orderItems: orderItems,
      firstName: order.firstName,
      lastName: order.lastName,
      orderNumber: order.orderNumber,
      delivery: order.delivery,
      email: order.email ? order.email : '',
      phone: `0${order.phone}`,
      status: order.status
    })
  }

  return (
    <OrdersPage orders={orders} pagination={{totalPages, currentPage}}/>
  );
};

export default Page;