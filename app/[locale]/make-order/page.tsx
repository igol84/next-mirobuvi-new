import React from 'react';
import OrderForm from "@/app/[locale]/make-order/OrderForm";
import {getCart} from "@/lib/db/cart";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {Locale} from "@/i18n/request";
import {unstable_setRequestLocale} from "next-intl/server";

type Props = {
  params: {
    locale: Locale
  }
}
async function MakeOrderPage({params: {locale}}: Props) {
  unstable_setRequestLocale(locale)
  const session = await getServerSession(authOptions)
  const cart = await getCart()
  const isCarNotEmpty = !!(cart && cart.items.length)
  return <OrderForm isAuthorized={!!session} isCarNotEmpty={isCarNotEmpty}/>
}

export default MakeOrderPage;