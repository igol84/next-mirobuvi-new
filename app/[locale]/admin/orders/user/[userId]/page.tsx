import React from 'react';
import {getUserWithOrders} from "@/lib/db/user";
import OrdersPage from "./OrdersPage";
import {IOrder, IOrderItem, IUser} from "./types";
import {getProductByUrl} from "@/lib/db/product";
import {getProductImageUrl} from "@/lib/productCardData";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";


interface Props {
  params: { locale: Locale, userId: string }
}

export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslations({locale, namespace: 'orderList'})
  return {
    title: t('title'),
    description: t('description'),
  }
}


const Page = async ({params: {locale, userId}}: Props) => {
  const t = await getTranslations({locale, namespace: 'orderList'})
  const userdata = await getUserWithOrders(Number(userId))
  if (!userdata) return <div>{t('userNotFound')}</div>

  const orders: IOrder[] = []
  for (const order of userdata.orders) {
    const items: IOrderItem[] = []
    for (const item of order.orderItems) {
      const productData = await getProductByUrl(item.productId)
      if (productData) {
        const imgUrl = getProductImageUrl(productData.url, productData.imgUpdatedAt?.getTime())
        items.push({
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
      orderItems: items,
      firstName: order.firstName,
      lastName: order.lastName,
      orderNumber: order.orderNumber,
      delivery: order.delivery,
      email: order.email ? order.email : '',
      phone: `0${order.phone}`,
      status: order.status
    })
  }

  const user: IUser = {
    id: userdata.id,
    name: userdata.name ? userdata.name : null,
    email: userdata.email ? userdata.email : null,
    image: userdata.image ? userdata.image : null,
    orders
  }
  return (
    <div>
      <OrdersPage user={user}/>
    </div>
  );
};

export default Page;