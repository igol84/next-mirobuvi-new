import {redirect} from "next/navigation";
import {getProductByUrl, getProductUrls} from "@/lib/db/product";
import {BrandType, ProductFormSchema} from "@/components/product/admin/types";
import {Heading, VStack} from "@chakra-ui/react";
import BreadCrumb from "@/components/base/BreadCrumb";
import ProductForm from "@/components/product/admin/ProductForm";
import React from "react";
import {getBreadCrumb} from "@/app/[locale]/products/[productUrl]/(admin)/edit/serverFunctions";
import {getBrand, getBrands} from "@/lib/db/brand";
import {getAllImages, getFTPClient} from "@/lib/ftp";
import {env} from "@/lib/env";
import {Image} from "@/components/product/admin/ProductImage";
import {SizeType} from "@/components/product/admin/shoes/types";
import _ from "lodash";
import {getProductImageUrl} from "@/lib/productCardData";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";

type Props = {
  params: {
    locale: Locale
    productUrl: string
  }
}


const ProductEditPage = async ({params: {locale, productUrl}}: Props) => {
  const t = await getTranslations({locale, namespace: 'productAdmin'})
  const productData = await getProductByUrl(productUrl)
  if (!productData) redirect(`/`)
  const brandData = await getBrand(productData.brand_id)
  if (!brandData) redirect(`/`)
  const productName = locale === 'en' ? productData.name_en : productData.name_ua
  const brandName = locale === 'en' ? brandData.name_en : brandData.name_ua
  const breadCrumb = await getBreadCrumb(locale, brandName, brandData.url, productName, productUrl)
  const allProductUrls = await getProductUrls()
  const urlList = allProductUrls.filter(url => url !== productData.url)
  const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
  const images = await getAllImages(ftpClient, `products/${productData.url}`)
  ftpClient.close()
  const urlImages: Image[] = images.map(image => ({
    name: image,
    url: getProductImageUrl(productData.url, productData.imgUpdatedAt?.getTime(), image)
  }))
  const shoeses: SizeType[] = productData.shoeses.map((shoe) => (
    {size: shoe.size, isAvailable: shoe.is_available, length: shoe.length}
  ))
  const sortedShoes = _.sortBy(shoeses, 'size')
  const defaultValues: ProductFormSchema = {
    selectedId: productData.id,
    id: productData.id,
    nameEn: productData.name_en,
    nameUa: productData.name_ua,
    nameRu: productData.name_ru,
    titleUa: productData.title_ua,
    titleEn: productData.title_en,
    metaDescEn: productData.meta_desc_en,
    metaDescUa: productData.meta_desc_ua,
    tags: productData.tags,
    groupName: productData.group_name,
    url: productData.url,
    textEn: productData.text_en,
    textUa: productData.text_ua,
    textRu: productData.text_ru,
    active: productData.active,
    private: productData.private,
    isAvailable: !!productData.is_available,
    price: productData.price,
    discount: productData.discount,
    promActive: productData.prom_active,
    promAddToId: productData.prom_add_to_id,
    season: productData.season,
    color: productData.color,
    filesImg: [],
    type: productData.type,
    brandId: productData.brand_id
  }
  const brandsData = await getBrands()
  const brands: BrandType[] = brandsData.map(brand => ({
    id: brand.id,
    name: locale === 'en' ? brand.name_en : brand.name_ua,
    url: brand.url
  }))
  return (
    <VStack align='left' spacing={4}>
      <BreadCrumb breadCrumbs={breadCrumb}/>
      <Heading as='h1'>{t('editProduct')} {productName}</Heading>
      <ProductForm defaultValues={defaultValues} shoeses={sortedShoes} urlList={urlList} urlImages={urlImages}
                   brands={brands}/>
    </VStack>
  )
}

export default ProductEditPage
