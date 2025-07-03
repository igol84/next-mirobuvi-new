import React from 'react';
import {BrandCardPropsWithFirst, getBrandsImageUrl} from "@/components/Brands/types";
import BrandPage from "@/app/[locale]/brands/BrandPage";
import {getViewedProducts} from "@/lib/productsGetter";
import {getBrands} from "@/lib/db/brand";
import {checkForAdmin, checkForAuth, checkForEditor, getAuthUser} from "@/utility/auth";
import _ from "lodash";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {Locale} from "@/i18n/request";
import {getUserDiscount} from "@/lib/db/user";

type Props = {
  params: {
    locale: Locale
  }
}

export async function generateMetadata({params: {locale}}: Props) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations({locale, namespace: 'brands'})
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}

const BrandsPage = async ({params: {locale}}: Props) => {
  const isAdmin = await checkForAdmin()
  const isEditor = await checkForEditor()
  const isAuth = await checkForAuth()
  const userId = await getAuthUser()
  const userDiscount = userId ? await getUserDiscount(Number(userId)) : 0
  let brandsData = await getBrands()
  if (!isAuth)
    brandsData = brandsData.filter(brand => !brand.private)
  if (!isAdmin && !isEditor)
    brandsData = brandsData.filter(brand => brand.active)


  brandsData = _.orderBy(brandsData, 'order_number')
  const brands: BrandCardPropsWithFirst[] = brandsData.map((brand, index) => {
    const imgUrl = getBrandsImageUrl(brand.url, brand.updatedAt?.getTime())
    return {
      brandId: brand.id, brandName: brand[`name_${locale}`], url: brand.url, isFirst: index < 6, imgUrl
    }
  })
  const viewedProducts = await getViewedProducts(locale, isAdmin, isAuth, userDiscount)
  return (
    <BrandPage brands={brands} viewedProducts={viewedProducts}/>
  )
}

export default BrandsPage;