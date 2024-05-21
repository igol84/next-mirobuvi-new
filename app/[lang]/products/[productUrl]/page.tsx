import React from 'react';
import {Lang} from "@/dictionaries/get-dictionary";
import ProductPage from "@/app/[lang]/products/[productUrl]/ProductPage";

import '@/app/theme/style.scss'
import {redirect} from 'next/navigation'
import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getViewedProducts} from "@/lib/productsGetter";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {getUser} from "@/lib/db/user";
import {getBreadCrumbData, productFabrice} from "@/app/[lang]/products/[productUrl]/serverFunctions";
import {getProductByUrl, getProducts} from "@/lib/db/product";
import {getProductImageUrl} from "@/lib/productCardData";
import {checkForAdmin, checkForAuth} from "@/utility/auth";
import _ from "lodash";


type Props = {
  params: {
    productUrl: string
    lang: Lang
  }
}

export async function generateMetadata({params: {productUrl, lang}}: Props) {
  const productData = await getProductByUrl(productUrl)
  if (!productData) redirect(`/`)
  const title = lang === 'en' ? productData.name_en : productData.name_ua
  const description = lang === 'en' ? productData.meta_desc_en : productData.meta_desc_ua
  const imgUrl = getProductImageUrl(productData.url, productData.imgUpdatedAt?.getTime())
  return {
    title,
    description,
    openGraph: {
      images: [imgUrl],
    },
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({productUrl: product.url}))
}

async function Page({params: {productUrl, lang}}: Props) {
  const isAdmin = await checkForAdmin()
  const isAuth = await checkForAuth()
  const productDBData = await getProductByUrl(productUrl)
  if (!productDBData) redirect(`/`)
  if (!isAuth && productDBData.private) redirect(`/`)
  if (!isAuth && productDBData.brand.private) redirect(`/`)
  if (!isAdmin && !productDBData.active) redirect(`/`)
  if (!isAdmin && !productDBData.brand.active) redirect(`/`)
  const session = await getServerSession(authOptions)
  const userId = session?.user.id
  const favoriteProducts = []
  if (userId) {
    const user = await getUser(Number(userId))
    if (user) {
      const favoriteProductsFromUser = user.favoriteProducts.split('|')
      favoriteProducts.push(...favoriteProductsFromUser)
    }
  }
  const images = _.times(productDBData.imgCount, index => `${index + 1}.jpeg`)
  const urlImages = images.map(image => {
    return getProductImageUrl(productDBData.url, productDBData.imgUpdatedAt?.getTime(), image)
  })
  const isProductFavorite = favoriteProducts.includes(productUrl)
  const productData = productFabrice(lang, productDBData, urlImages, userId, isProductFavorite)
  const breadCrumbData: BreadCrumbData[] = await getBreadCrumbData(lang, productDBData)
  const viewedProducts = await getViewedProducts(lang, isAdmin, isAuth)
  return (
    <ProductPage productData={productData} breadCrumbData={breadCrumbData} viewedProducts={viewedProducts}/>
  )
}

export default Page;