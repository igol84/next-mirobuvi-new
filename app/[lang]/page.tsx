import React from 'react';
import Home from "@/app/[lang]/Home";
import {BrandCardPropsWithFirst} from "@/components/Brands/types";
import {getBrandsData} from "@/app/api/fetchFunctions";


const Page = async () => {
  const brandsData = await getBrandsData()
  const brands: BrandCardPropsWithFirst[] = brandsData.map((brand, index) => ({
    brandId: brand.id, brandName: brand.name, url: brand.url, isFirst: index < 6
  }))

  return (
    <Home brands={brands}/>
  );
};

export default Page;