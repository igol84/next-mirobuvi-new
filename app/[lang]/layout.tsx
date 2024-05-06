import {Roboto} from 'next/font/google'
import React from "react";
import {Providers} from "@/app/providers";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import './globals.scss'
import Container from "@/components/Container";
import {getCart} from "@/lib/db/cart";
import {getCartData, ProductCart} from "@/lib/server/cart/cartFunctions";
import {env} from "@/lib/env";
import {getUser} from "@/lib/db/user";
import {userConvertFromDB} from "@/lib/store/user";
import {convertToTagUrlFromDB, TagUrl} from "@/app/[lang]/[urlTag]/types";
import _ from "lodash";
import {getBrands} from "@/lib/db/brand";
import {Item} from "@/components/Container/Navbar/types";
import {getTagUrls} from "@/lib/db/tagUrl";
import {checkForAdmin, getAuthUser} from "@/utility/auth";

export const dynamic = 'force-dynamic'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    metadataBase: new URL(env.URL),
    title: dict.home.title,
    description: dict.home.description,
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}


export default async function RootLayout(
  {
    children,
    params: {lang},
  }: {
    children: React.ReactNode
    params: { lang: Lang }
  }) {
  const dict = await getDictionary(lang)
  const isAdmin = await checkForAdmin()
  const userId = await getAuthUser()
  const isAuth = !!userId
  let brandsData = await getBrands()
  if (!isAuth)
    brandsData = brandsData.filter(brand => !brand.private)
  if (!isAdmin)
    brandsData = brandsData.filter(brand => brand.active)
  const brandsItems: Item[] = brandsData.map(brand => ({title: brand.name_en, url: brand.url}))
  const cart = await getCart();


  const cartProducts: ProductCart[] = cart ? await getCartData(cart, lang) : []
  const fetchTagsUrl = await getTagUrls()
  const fetchParentTagsUrl = fetchTagsUrl.filter(tag => tag.parent === '')
  const orderedFetchParentTagsUrl = _.orderBy(fetchParentTagsUrl, ['order_number'], ['asc'])
  const fetchSubTagsUrl = fetchTagsUrl.filter(tag => tag.parent !== '')
  const orderedFetchSubTagsUrl = _.orderBy(fetchSubTagsUrl, ['order_number'], ['asc'])
  const tagsUrl: TagUrl[] = []
  orderedFetchParentTagsUrl.forEach(parentTag => {
    const submenu = orderedFetchSubTagsUrl
      .filter(tag => tag.parent === parentTag.url)
      .map(tag => convertToTagUrlFromDB(tag, lang))
    const tagUrl: TagUrl = convertToTagUrlFromDB(parentTag, lang, submenu)
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
    <html lang={lang} suppressHydrationWarning={true}>
    <body className={roboto.className} suppressHydrationWarning={true}>
    <Providers dict={dict} lang={lang} isAdmin={isAdmin}>
      <Container brandsItems={brandsItems} cartProducts={cartProducts} user={user} tagsUrl={tagsUrl}>
        {children}
      </Container>
    </Providers>
    </body>
    </html>
  )
}
