import React from 'react';
import Home from "@/app/[lang]/Home";
import {BrandCardPropsWithFirst} from "@/components/Brands/types";
import {getBrands} from "@/lib/db/brand";
import {Lang} from "@/dictionaries/get-dictionary";
import {env} from "@/lib/env";

type Props = {
  params: {
    lang: Lang
  }
}

const Page = async ({params: {lang}}: Props) => {
  const brandsData = await getBrands()
  const brands: BrandCardPropsWithFirst[] = brandsData.map((brand, index) => {
    const imgUrl = `${env.FTP_URL}/brands/${brand.url}.jpeg`
    return {
      brandId: brand.id, brandName: brand[`name_${lang}`], url: brand.url, isFirst: index < 6, imgUrl
    }
  })

  return (
    <Home brands={brands}/>
  );
};

export default Page;