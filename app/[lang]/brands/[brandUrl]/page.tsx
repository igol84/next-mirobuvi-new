import React from 'react';
import '@/app/theme/style.scss'
import {getProductsDataByBrandId} from "@/app/api/fetchFunctions";
import {Lang} from "@/dictionaries/get-dictionary";
import {BrandProps} from "@/components/Brands/types";
import {ProductType} from "@/components/Products/types";
import {redirect} from "next/navigation";
import {getViewedProducts} from "@/lib/productsGetter";
import {createProduct} from "@/lib/productCardData";
import {SortingType} from "@/components/base/SortingSelect/types";
import {getPageData, sortingProducts} from "@/lib/store/serverFunctions";
import {FiltersValues} from "@/lib/store/filters/serverFunctions/types";
import {getFilterProducts} from "@/lib/store/filters/serverFunctions/serverFunctions";
import {getBreadCrumb} from "@/app/[lang]/brands/[brandUrl]/serverFunctions";
import FiltersLayout from "@/components/Products/FiltersLayout";
import ProductsList from "@/components/Products/productsList";
import {getBrandByUrl, getBrands} from "@/lib/db/brand";
import {env} from "@/lib/env";
import {checkForAdmin, checkForAuth} from "@/utility/auth";

type Props = {
  params: {
    brandUrl: string
    lang: Lang
  }
  searchParams: {
    page?: string
    sortingBy?: SortingType
  } & FiltersValues
}

export async function generateMetadata({params: {brandUrl, lang}}: Props) {
  const brandData = await getBrandByUrl(brandUrl)
  if (!brandData) redirect('/')
  const imgUrl = `${env.FTP_URL}/brands/${brandData.url}.jpeg?key=${brandData.updatedAt}`
  const title = lang === 'en' ? brandData.title_en : brandData.title_ua
  const description = lang === 'en' ? brandData.meta_desc_en : brandData.meta_desc_ua
  return {
    title,
    description,
    openGraph: {
      images: [imgUrl],
    },
  }
}

export async function generateStaticParams() {
  const brandsData = await getBrands()
  return brandsData.map((brand) => ({brandUrl: brand.url}))
}

const Page = async ({params: {brandUrl, lang}, searchParams}: Props) => {
  const {page = '1', sortingBy = 'byOrder', ...filtersValues} = searchParams
  const isAdmin = await checkForAdmin()
  const isAuth = await checkForAuth()
  const brandData = await getBrandByUrl(brandUrl)
  if (!brandData) redirect(`/`)
  if (!isAuth && !brandData.active) redirect(`/`)
  const productsData = await getProductsDataByBrandId(brandData.id)
  if (!productsData) redirect(`/`)
  const desc = lang === 'en' ? brandData.text_en : brandData.text_ua
  const brandName = lang === 'en' ? brandData.name_en : brandData.name_en
  const brand: BrandProps = {
    brandId: brandData.id, brandName, url: brandData.url, desc, imgUrl: ''
  }
  const breadCrumbs = await getBreadCrumb(lang, brand.brandName, brand.url)
  let products: ProductType[] = productsData.map(product => createProduct(product, lang))
  const filterProducts = getFilterProducts(products, filtersValues)
  products = filterProducts.products
  products = sortingProducts(products, sortingBy)
  const [productsSlice, paginationBar] = await getPageData(products, parseInt(page), true)
  const viewedProducts = await getViewedProducts(lang)
  return (
    <FiltersLayout desc={brand.desc} breadCrumbs={breadCrumbs} viewedProducts={viewedProducts} sortingBy={sortingBy}
                   filterMenuType={filterProducts.filterMenuType}>
      <ProductsList products={productsSlice} brandData={brand} paginationBar={paginationBar} isAdmin={isAdmin}/>
    </FiltersLayout>
  )
}

export default Page;