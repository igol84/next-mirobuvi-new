import ProductForm from "@/components/product/admin/ProductForm";
import {Heading, VStack} from "@chakra-ui/react";
import BreadCrumb from "@/components/base/BreadCrumb";
import React from "react";
import {getBrandByUrl, getBrands} from "@/lib/db/brand";
import {redirect} from "next/navigation";
import {getBreadCrumb} from "@/app/[locale]/brands/[brandUrl]/(admin)/add/serverFunctions";
import {BrandType, DefaultValues, defaultValues} from "@/components/product/admin/types";
import {getProductNexId, getProductUrls} from "@/lib/db/product";
import {SizeType} from "@/components/product/admin/shoes/types";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";


type Props = {
  params: {
    locale: Locale
    brandUrl: string
  }
}

const AddNewProductPage = async ({params: {locale, brandUrl}}: Props) => {
  const t = await getTranslations({locale, namespace: 'productAdmin'})
  const brandData = await getBrandByUrl(brandUrl)
  if (!brandData) redirect(`/`)
  const breadCrumb = await getBreadCrumb(locale, brandData.name_en, brandUrl)
  const allProductUrls = await getProductUrls()
  const nexId = await getProductNexId()
  const defaultValuesWithBrandId: DefaultValues = {...defaultValues, brandId: brandData.id, id: nexId}
  const shoeses: SizeType = {size: 36, isAvailable: true, length: 23.5}
  const brandsData = await getBrands()
  const brands: BrandType[] = brandsData.map(brand => ({
    id: brand.id,
    name: locale === 'en' ? brand.name_en : brand.name_ua,
    url: brand.url
  }))
  return (
    <VStack align='left' spacing={4}>
      <Heading as='h1'>{t('addProduct')}</Heading>
      <BreadCrumb breadCrumbs={breadCrumb}/>
      <ProductForm defaultValues={defaultValuesWithBrandId} urlList={allProductUrls} shoeses={[shoeses]}
                   brands={brands}/>
    </VStack>
  )
}

export default AddNewProductPage