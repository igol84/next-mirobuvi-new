import React from 'react';
import OrderForm from "@/app/[lang]/make-order/OrderForm";
import {getCart} from "@/lib/db/cart";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";

async function MakeOrderPage() {
  const session = await getServerSession(authOptions)
  const cart = await getCart()
  const isCarNotEmpty = !!(cart && cart.items.length)
  return <OrderForm isAuthorized={!!session} isCarNotEmpty={isCarNotEmpty}/>
}

export default MakeOrderPage;