import React from 'react'
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {redirect} from "next/navigation";
import {getUser, putFavoriteProduct} from "@/lib/db/user";
import FavoriteProductsPage from "@/app/[lang]/profile/favorite-products/FavoriteProductsPage";
import {getProductData} from "@/app/api/fetchFunctions";
import {createProduct} from "@/lib/productCardData";
import {ProductType} from "@/components/Products/types";
import NotFavoriteProducts from "@/app/[lang]/profile/favorite-products/NotFavoriteProducts";
import UserNotFound from "@/components/base/UserNotFound";

export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.favoriteList.title,
    description: dict.favoriteList.description,
  }
}

type Props = {
  params: {
    lang: Lang
  }
}

const Page = async ({params: {lang}}: Props) => {
  const session = await getServerSession(authOptions)
  if (session) {
    const user = await getUser(session.user.id)
    if (!user) {
      return <UserNotFound/>
    }
    if (user.favoriteProducts.length === 0)
      return <NotFavoriteProducts/>

    const favoriteProductUrls = user.favoriteProducts
    const favoriteProducts: ProductType[] = []
    for (const favoriteProductUrl of favoriteProductUrls) {
      const productFetchData = await getProductData(favoriteProductUrl)
      if (productFetchData === undefined)
        return <div>Server error</div>
      if (productFetchData === null) {
        await putFavoriteProduct(user.id, favoriteProductUrl)
        continue
      }
      const product = createProduct(productFetchData, lang)
      favoriteProducts.push(product)
    }

    return (
      <FavoriteProductsPage products={favoriteProducts.reverse()} userId={user.id}/>
    )
  } else {
    redirect(`/api/auth/signin?callbackUrl=/${lang}/profile/orders-list`)
  }
}

export default Page