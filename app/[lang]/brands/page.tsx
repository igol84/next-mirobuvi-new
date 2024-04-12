import React from 'react';
import {BrandCardPropsWithFirst} from "@/components/Brands/types";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import BrandPage from "@/app/[lang]/brands/BrandPage";
import {getViewedProducts} from "@/lib/productsGetter";
import {getBrands} from "@/lib/db/brand";
import {env} from "@/lib/env";
import {checkForAdmin} from "@/utility/auth";

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
  const brandsData = await getBrands()
  const brands: BrandCardPropsWithFirst[] = brandsData.map((brand, index) => {
    const imgUrl = `${env.FTP_URL}/brands/${brand.url}.jpeg?key=${brand.updatedAt}`
    return {
      brandId: brand.id, brandName: brand[`name_${lang}`], url: brand.url, isFirst: index < 6, imgUrl
    }
  })
  const viewedProducts = await getViewedProducts(lang)
  return (
    <BrandPage brands={brands} viewedProducts={viewedProducts} isAdmin={isAdmin}/>
  )
}

export default BrandsPage;