import React from 'react';
import Home from "@/app/[lang]/Home";
import {BrandCardPropsWithFirst} from "@/components/Brands/types";
import {getBrands} from "@/lib/db/brand";
import {Lang} from "@/dictionaries/get-dictionary";
import {env} from "@/lib/env";
import {checkForAuth} from "@/utility/auth";

type Props = {
  params: {
    lang: Lang
  }
}

const Page = async ({params: {lang}}: Props) => {
  const isAuthUser = await checkForAuth()
  let brandsData = await getBrands()
  if (!isAuthUser)
    brandsData = brandsData.filter(brand => brand.active)
  const brands: BrandCardPropsWithFirst[] = brandsData.map((brand, index) => {
    const imgUrl = `${env.FTP_URL}/brands/${brand.url}.jpeg?key=${brand.updatedAt}`
    return {
      brandId: brand.id, brandName: brand[`name_${lang}`], url: brand.url, isFirst: index < 6, imgUrl
    }
  })
  return (
    <Home brands={brands}/>
  );
};

export default Page;