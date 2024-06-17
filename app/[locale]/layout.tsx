import {Roboto} from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import React from "react";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {Providers} from "@/app/providers";
import './globals.scss'
import {getCart} from "@/lib/db/cart";
import {getCartData, ProductCart} from "@/lib/server/cart/cartFunctions";
import {env} from "@/lib/env";
import {getUser, getUserDiscount} from "@/lib/db/user";
import {userConvertFromDB} from "@/lib/store/user";
import {convertToTagUrlFromDB, TagUrl} from "@/app/[locale]/[urlTag]/types";
import _ from "lodash";
import {getBrands} from "@/lib/db/brand";
import {Item} from "@/components/Container/Navbar/types";
import {getTagUrls} from "@/lib/db/tagUrl";
import {checkForAdmin, checkForEditor, getAuthUser} from "@/utility/auth";
import {Locale, locales} from "@/i18n";
import Container from "@/components/Container";


export const dynamic = 'force-dynamic'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export async function generateMetadata({params: {locale}}: { params: { locale: Locale } }) {
  const t = await getTranslations({locale, namespace: 'home'})
  return {
    metadataBase: new URL(env.URL),
    title: t('title'),
    description: t('description'),
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function RootLayout(
  {
    children,
    params: {locale},
  }: {
    children: React.ReactNode
    params: { locale: Locale }
  }) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages();
  const isAdmin = await checkForAdmin()
  const isEditor = await checkForEditor()
  const userId = await getAuthUser()
  const userDiscount = userId ? await getUserDiscount(Number(userId)) : 0
  const isAuth = !!userId
  let brandsData = await getBrands()
  if (!isAuth)
    brandsData = brandsData.filter(brand => !brand.private)
  if (!isAdmin)
    brandsData = brandsData.filter(brand => brand.active)
  const brandsItems: Item[] = brandsData.map(brand => ({title: brand.name_en, url: brand.url}))
  const cart = await getCart();


  const cartProducts: ProductCart[] = cart ? await getCartData(cart, locale, userDiscount) : []
  const fetchTagsUrl = await getTagUrls()
  const fetchParentTagsUrl = fetchTagsUrl.filter(tag => tag.parent === '')
  const orderedFetchParentTagsUrl = _.orderBy(fetchParentTagsUrl, ['order_number'], ['asc'])
  const fetchSubTagsUrl = fetchTagsUrl.filter(tag => tag.parent !== '')
  const orderedFetchSubTagsUrl = _.orderBy(fetchSubTagsUrl, ['order_number'], ['asc'])
  const tagsUrl: TagUrl[] = []
  orderedFetchParentTagsUrl.forEach(parentTag => {
    const submenu = orderedFetchSubTagsUrl
      .filter(tag => tag.parent === parentTag.url)
      .map(tag => convertToTagUrlFromDB(tag, locale))
    const tagUrl: TagUrl = convertToTagUrlFromDB(parentTag, locale, submenu)
    tagsUrl.push(tagUrl)
  })

  let user = null
  if (userId) {
    const userDB = await getUser(Number(userId))
    if (userDB) {
      user = userConvertFromDB(userDB)
    }
  }
  return (
    <html lang={locale === 'ua' ? 'uk' : locale} suppressHydrationWarning={true}>
    <body className={roboto.className} suppressHydrationWarning={true}>
    <NextIntlClientProvider messages={messages}>
      <Providers isAdmin={isAdmin} isEditor={isEditor} userDiscount={userDiscount}>
        <Container brandsItems={brandsItems} cartProducts={cartProducts} user={user} tagsUrl={tagsUrl}>
          {children}
        </Container>
      </Providers>
    </NextIntlClientProvider>
    </body>
    <GoogleAnalytics gaId="G-YZ460H3L3B" />
    </html>
  )
}
