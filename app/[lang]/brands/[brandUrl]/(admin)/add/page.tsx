import {Lang} from "@/dictionaries/get-dictionary";
import ProductForm from "@/components/product/admin/ProductForm";
import {VStack} from "@chakra-ui/react";
import BreadCrumb from "@/components/base/BreadCrumb";
import React from "react";
import {getBrandByUrl} from "@/lib/db/brand";
import {redirect} from "next/navigation";
import {getBreadCrumb} from "@/app/[lang]/brands/[brandUrl]/(admin)/add/serverFunctions";
import {DefaultValues, defaultValues} from "@/components/product/admin/types";
import {getProductUrls} from "@/lib/db/product";
import {checkForAdmin} from "@/utility/auth";

type Props = {
  params: {
    lang: Lang
    brandUrl: string
  }
}


const AddNewBrandPage = async ({params: {lang, brandUrl}}: Props) => {
  const isAdmin = await checkForAdmin()
  if (!isAdmin)  redirect('/')
  const brandData = await getBrandByUrl(brandUrl)
  if (!brandData) redirect(`/`)
  const breadCrumb = await getBreadCrumb(lang, brandData.url, brandUrl)
  const allProductUrls = await getProductUrls()
  const urlList = allProductUrls.filter(url => url !== brandData.url)
  const defaultValuesWithBrandId: DefaultValues = {...defaultValues, brandId: brandData.id}
  return (
    <VStack align='left' spacing={4}>
      <BreadCrumb breadCrumbs={breadCrumb}/>
      <ProductForm defaultValues={defaultValuesWithBrandId} urlList={urlList}/>
    </VStack>
  )
}

export default AddNewBrandPage