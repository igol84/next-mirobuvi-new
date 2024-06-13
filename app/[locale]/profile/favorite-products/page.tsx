import React from 'react'
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {redirect} from "next/navigation";
import {getUser, getUserDiscount, putFavoriteProduct} from "@/lib/db/user";
import FavoriteProductsPage from "@/app/[locale]/profile/favorite-products/FavoriteProductsPage";
import {createProduct} from "@/lib/productCardData";
import {ProductType} from "@/components/Products/types";
import NotFavoriteProducts from "@/app/[locale]/profile/favorite-products/NotFavoriteProducts";
import UserNotFound from "@/components/base/UserNotFound";
import {getProductByUrl} from "@/lib/db/product";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";

type Props = {
  params: {
    locale: Locale
  }
}

export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslations({locale, namespace: 'favoriteList'})
  return {
    title: t('title'),
    description: t('description'),
  }
}


const Page = async ({params: {locale}}: Props) => {
  const session = await getServerSession(authOptions)
  if (session) {
    const user = await getUser(Number(session.user.id))
    if (!user) {
      return <UserNotFound/>
    }
    if (user.favoriteProducts === '')
      return <NotFavoriteProducts/>
    const userDiscount = await getUserDiscount(user.id)
    const favoriteProductUrls = user.favoriteProducts.split('|')
    const favoriteProducts: ProductType[] = []
    for (const favoriteProductUrl of favoriteProductUrls) {
      const productFetchData = await getProductByUrl(favoriteProductUrl)
      if (productFetchData === undefined)
        return <div>Server error</div>
      if (productFetchData === null) {
        await putFavoriteProduct(user.id, favoriteProductUrl)
        continue
      }
      const product = createProduct(productFetchData, locale, userDiscount)
      favoriteProducts.push(product)
    }

    return (
      <FavoriteProductsPage products={favoriteProducts.reverse()} userId={user.id}/>
    )
  } else {
    redirect(`/api/auth/signin?callbackUrl=/${locale}/profile/favorite-products`)
  }
}

export default Page