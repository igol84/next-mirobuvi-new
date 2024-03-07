import React from 'react';
import {Lang} from "@/dictionaries/get-dictionary";
import {getProductData, getProductUrls} from "@/app/api/fetchFunctions";
import ProductPage from "@/app/[lang]/products/[productUrl]/ProductPage";
import {ProductType} from "@/components/product/types";

import '@/app/theme/style.scss'
import {redirect} from 'next/navigation'
import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getViewedProducts} from "@/lib/productsGetter";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {getUser} from "@/lib/db/user";
import {getBreadCrumbData, productFabrice} from "@/app/[lang]/products/[productUrl]/serverFunctions";


type Props = {
  params: {
    productUrl: string
    lang: Lang
  }
}

export async function generateMetadata({params: {productUrl, lang}}: Props) {
  const productData = await getProductData(productUrl)
  if (!productData) redirect(`/`)
  const title = lang === 'en' ? productData.name : productData.name_ua
  return {
    title,
    openGraph: {
      images: [`https://mirobuvi.com.ua/ftp_products/${productData.product_key}/02.jpg`],
    },
  }
}

export async function generateStaticParams() {
  const productUrls = await getProductUrls()
  return productUrls.map((product) => ({productUrl: product.url}))
}

async function Page({params: {productUrl, lang}}: Props) {
  const productFetchData = await getProductData(productUrl)
  if (!productFetchData) redirect(`/`)
  const session = await getServerSession(authOptions)
  const userId = session?.user.id
  const favoriteProducts = []
  if (userId) {
    const user = await getUser(userId)
    if (user) {
      favoriteProducts.push(...user.favoriteProducts)
    }
  }
  const isProductFavorite = favoriteProducts.includes(productUrl)
  const productData: ProductType = productFabrice(lang, productFetchData, userId, isProductFavorite)
  const breadCrumbData: BreadCrumbData[] = await getBreadCrumbData(lang, productFetchData)
  const viewedProducts = await getViewedProducts(lang)
  return (
    <ProductPage productData={productData} breadCrumbData={breadCrumbData} viewedProducts={viewedProducts}/>
  )
}

export default Page;