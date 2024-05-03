import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import ProductForm from "@/components/product/admin/ProductForm";
import {Heading, VStack} from "@chakra-ui/react";
import BreadCrumb from "@/components/base/BreadCrumb";
import React from "react";
import {getBrandByUrl} from "@/lib/db/brand";
import {redirect} from "next/navigation";
import {getBreadCrumb} from "@/app/[lang]/brands/[brandUrl]/(admin)/add/serverFunctions";
import {DefaultValues, defaultValues} from "@/components/product/admin/types";
import {getProductNexId, getProductUrls} from "@/lib/db/product";
import {checkForAdmin} from "@/utility/auth";
import {SizeType} from "@/components/product/admin/shoes/types";

type Props = {
  params: {
    lang: Lang
    brandUrl: string
  }
}


const AddNewProductPage = async ({params: {lang, brandUrl}}: Props) => {
  const dict = await getDictionary(lang)
  const isAdmin = await checkForAdmin()
  if (!isAdmin)  redirect('/')
  const brandData = await getBrandByUrl(brandUrl)
  if (!brandData) redirect(`/`)
  const breadCrumb = await getBreadCrumb(lang, brandData.name_en, brandUrl)
  const allProductUrls = await getProductUrls()
  const nexId = await getProductNexId()
  const defaultValuesWithBrandId: DefaultValues = {...defaultValues, brandId: brandData.id, id: nexId}
  const shoeses: SizeType = {size: 36, isAvailable: true, length: 23.5}

  return (
    <VStack align='left' spacing={4}>
      <Heading as='h1'>{dict.productAdmin.addProduct}</Heading>
      <BreadCrumb breadCrumbs={breadCrumb}/>
      <ProductForm defaultValues={defaultValuesWithBrandId} urlList={allProductUrls} shoeses={[shoeses]}/>
    </VStack>
  )
}

export default AddNewProductPage