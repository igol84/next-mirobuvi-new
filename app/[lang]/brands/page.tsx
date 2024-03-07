import React from 'react';
import {BrandCardPropsWithFirst} from "@/components/Brands/types";
import {getBrandsData} from "@/app/api/fetchFunctions";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import BrandPage from "@/app/[lang]/brands/BrandPage";
import {getViewedProducts} from "@/lib/productsGetter";

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
  const brandsData = await getBrandsData()
  const brands: BrandCardPropsWithFirst[] = brandsData.map((brand, index) => ({
    brandId: brand.id, brandName: brand.name, url: brand.url, isFirst: index < 6
  }))
  const viewedProducts = await getViewedProducts(lang)
  return (
    <BrandPage brands={brands} viewedProducts={viewedProducts}/>
  )
}

export default BrandsPage;