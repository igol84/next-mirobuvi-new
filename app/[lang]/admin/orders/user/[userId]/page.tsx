import React from 'react';
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {getUserWithOrders} from "@/lib/db/user";
import OrdersPage from "./OrdersPage";
import {IOrder, IOrderItem, IUser} from "./types";
import {getProductByUrl} from "@/lib/db/product";
import {env} from "@/lib/env";


interface Props {
  params: { lang: Lang, userId: string }
}

export async function generateMetadata({params: {lang}}: Props) {
  const dict = await getDictionary(lang)
  return {
    title: dict.orderList.title,
    description: dict.orderList.description,
  }
}


const Page = async ({params: {lang, userId}}: Props) => {
  const dict = await getDictionary(lang)
  const userdata = await getUserWithOrders(Number(userId))
  if (!userdata) return <div>{dict.orderList.userNotFound}</div>

  const orders: IOrder[] = []
  for (const order of userdata.orders) {
    const items: IOrderItem[] = []
    for (const item of order.orderItems) {
      const productData = await getProductByUrl(item.productId)
      if (productData) {
        const imgUrl = `${env.FTP_URL}/products/${productData.url}/1.jpeg?key=${productData.imgUpdatedAt?.getTime()}`
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