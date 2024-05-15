import React from 'react';
import Home from "@/app/[lang]/Home";
import {BrandCardPropsWithFirst, getBrandsImageUrl} from "@/components/Brands/types";
import {getBrands} from "@/lib/db/brand";
import {Lang} from "@/dictionaries/get-dictionary";
import {checkForAdmin, checkForAuth} from "@/utility/auth";
import _ from "lodash";

type Props = {
  params: {
    lang: Lang
  }
}

const Page = async ({params: {lang}}: Props) => {
  const isAdminUser = await checkForAdmin()
  const isAuth = await checkForAuth()
  let brandsData = await getBrands()
  if (!isAuth)
    brandsData = brandsData.filter(brand => !brand.private)
  if (!isAdminUser)
    brandsData = brandsData.filter(brand => brand.active)
  brandsData = _.orderBy(brandsData, 'order_number')
  const brands: BrandCardPropsWithFirst[] = brandsData.map((brand, index) => {
    const imgUrl = getBrandsImageUrl(brand.url, brand.updatedAt?.getTime())
    return {
      brandId: brand.id, brandName: brand[`name_${lang}`], url: brand.url, isFirst: index < 6, imgUrl
    }
  })
  return (
    <Home brands={brands}/>
  );
};

export default Page;