import React from 'react';
import '@/app/theme/style.scss'
import {BrandProps, getBrandsImageUrl} from "@/components/Brands/types";
import {redirect} from "next/navigation";
import {getViewedProducts} from "@/lib/productsGetter";

import {SortingType} from "@/components/base/SortingSelect/types";
import {getPageData, sortingProducts} from "@/lib/server/serverFunctions";
import {FiltersValues} from "@/lib/server/filters/serverFunctions/types";
import {getFilterProducts} from "@/lib/server/filters/serverFunctions/serverFunctions";
import {getBreadCrumb} from "@/app/[locale]/brands/[brandUrl]/serverFunctions";
import FiltersLayout from "@/components/Products/FiltersLayout";
import ProductsList from "@/components/Products/ProductsList";
import {getBrandByUrl, getBrands, getBrandWithProductsByUrl} from "@/lib/db/brand";
import {checkForAdmin, checkForAuth, checkForEditor, getAuthUser} from "@/utility/auth";
import {createProduct} from "@/app/[locale]/brands/[brandUrl]/functions";
import {ProductWithDetailsDBType} from "@/lib/db/product";
import {Locale} from "@/i18n/request";
import {unstable_setRequestLocale} from "next-intl/server";
import {getUserDiscount} from "@/lib/db/user";

type Props = {
  params: {
    brandUrl: string
    locale: Locale
  }
  searchParams: {
    page?: string
    sortingBy?: SortingType
  } & FiltersValues
}

export async function generateMetadata({params: {brandUrl, locale}}: Props) {
  unstable_setRequestLocale(locale)
  const brandData = await getBrandByUrl(brandUrl)
  if (!brandData) redirect('/')
  const imgUrl = getBrandsImageUrl(brandData.url, brandData.updatedAt?.getTime())
  const title = locale === 'en' ? brandData.title_en : brandData.title_ua
  const description = locale === 'en' ? brandData.meta_desc_en : brandData.meta_desc_ua
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

const Page = async ({params: {brandUrl, locale}, searchParams}: Props) => {
  const {page = '1', sortingBy = 'byDate', ...filtersValues} = searchParams
  const isAdmin = await checkForAdmin()
  const isEditor = await checkForEditor()
  const isAuth = await checkForAuth()
  const userId = await getAuthUser()
  const userDiscount = userId ? await getUserDiscount(Number(userId)) : 0
  const brandData = await getBrandWithProductsByUrl(brandUrl)
  if (!brandData) redirect(`/`)
  if (!isAuth && !isEditor && brandData.private) redirect(`/`)
  if (!isAdmin && !isEditor && !brandData.active) redirect(`/`)
  let productsData = brandData.products as ProductWithDetailsDBType[]
  if(!isAuth)
    productsData = productsData.filter(product=>!product.private)
  if(!isAdmin)
    productsData = productsData.filter(product=>product.active)
  const desc = locale === 'en' ? brandData.text_en : brandData.text_ua
  const brandName = locale === 'en' ? brandData.name_en : brandData.name_en
  const imgUrl = getBrandsImageUrl(brandData.url, brandData.updatedAt?.getTime())
  const brand: BrandProps = {
    brandId: brandData.id, brandName, url: brandData.url, desc, imgUrl
  }
  const breadCrumbs = await getBreadCrumb(locale, brand.brandName, brand.url)

  let products = productsData.map(product => createProduct(product, locale, userDiscount))
  const filterProducts = getFilterProducts(products, filtersValues)
  products = filterProducts.products
  products = sortingProducts(products, sortingBy)
  const [productsSlice, paginationBar] = await getPageData(products, parseInt(page), true)
  const viewedProducts = await getViewedProducts(locale, isAdmin, isAuth, userDiscount)
  return (
    <FiltersLayout desc={brand.desc} breadCrumbs={breadCrumbs} viewedProducts={viewedProducts}
                   sortingBy={sortingBy} filterMenuType={filterProducts.filterMenuType}>
      <ProductsList products={productsSlice} brandData={brand} paginationBar={paginationBar}/>
    </FiltersLayout>
  )
}

export default Page;