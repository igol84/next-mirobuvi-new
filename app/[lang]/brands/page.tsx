import React from 'react';
import {BrandCardPropsWithFirst, getBrandsImageUrl} from "@/components/Brands/types";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import BrandPage from "@/app/[lang]/brands/BrandPage";
import {getViewedProducts} from "@/lib/productsGetter";
import {getBrands} from "@/lib/db/brand";
import {checkForAdmin, checkForAuth} from "@/utility/auth";
import _ from "lodash";

type Props = {
  params: {
    lang: Lang
  }
}

export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.brands.title,
    description: dict.brands.description,
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}

const BrandsPage = async ({params: {lang}}: Props) => {
  const isAdmin = await checkForAdmin()
  const isAuth = await checkForAuth()
  let brandsData = await getBrands()
  if (!isAuth)
    brandsData = brandsData.filter(brand => !brand.private)
  if (!isAdmin)
    brandsData = brandsData.filter(brand => brand.active)
  brandsData = _.orderBy(brandsData, 'order_number')
  const brands: BrandCardPropsWithFirst[] = brandsData.map((brand, index) => {
    const imgUrl = getBrandsImageUrl(brand.url, brand.updatedAt?.getTime())
    return {
      brandId: brand.id, brandName: brand[`name_${lang}`], url: brand.url, isFirst: index < 6, imgUrl
    }
  })
  const viewedProducts = await getViewedProducts(lang, isAdmin, isAuth)
  return (
    <BrandPage brands={brands} viewedProducts={viewedProducts}/>
  )
}

export default BrandsPage;