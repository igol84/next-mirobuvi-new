import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import ProductForm from "@/components/product/admin/ProductForm";
import {Heading, VStack} from "@chakra-ui/react";
import BreadCrumb from "@/components/base/BreadCrumb";
import React from "react";
import {getBrandByUrl, getBrands} from "@/lib/db/brand";
import {redirect} from "next/navigation";
import {getBreadCrumb} from "@/app/[lang]/brands/[brandUrl]/(admin)/add/serverFunctions";
import {BrandType, DefaultValues, defaultValues} from "@/components/product/admin/types";
import {getProductNexId, getProductUrls} from "@/lib/db/product";
import {SizeType} from "@/components/product/admin/shoes/types";

type Props = {
  params: {
    lang: Lang
    brandUrl: string
  }
}


const AddNewProductPage = async ({params: {lang, brandUrl}}: Props) => {
  const dict = await getDictionary(lang)
  const brandData = await getBrandByUrl(brandUrl)
  if (!brandData) redirect(`/`)
  const breadCrumb = await getBreadCrumb(lang, brandData.name_en, brandUrl)
  const allProductUrls = await getProductUrls()
  const nexId = await getProductNexId()
  const defaultValuesWithBrandId: DefaultValues = {...defaultValues, brandId: brandData.id, id: nexId}
  const shoeses: SizeType = {size: 36, isAvailable: false, length: 23.5}
  const brandsData = await getBrands()
  const brands: BrandType[] = brandsData.map(brand => ({
    id: brand.id,
    name: lang === 'en' ? brand.name_en : brand.name_ua,
    url: brand.url
  }))
  return (
    <VStack align='left' spacing={4}>
      <Heading as='h1'>{dict.productAdmin.addProduct}</Heading>
      <BreadCrumb breadCrumbs={breadCrumb}/>
      <ProductForm defaultValues={defaultValuesWithBrandId} urlList={allProductUrls} shoeses={[shoeses]}
                   brands={brands}/>
    </VStack>
  )
}

export default AddNewProductPage