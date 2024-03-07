import React from 'react';
import '@/app/theme/style.scss'
import {getBrandData, getBrandsData, getProductsDataByBrandId} from "@/app/api/fetchFunctions";
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
  const brandData = await getBrandData(brandUrl)
  if (!brandData) redirect('/')
  const title = lang === 'en' ? brandData.title : brandData.title_ua
  return {
    title,
    openGraph: {
      images: [`https://mirobuvi.com.ua/ftp_brands/${brandData.id}.jpg`],
    },
  }
}

export async function generateStaticParams() {
  const brandsData = await getBrandsData()
  return brandsData.map((brand) => ({brandUrl: brand.url}))
}

const Page = async ({params: {brandUrl, lang}, searchParams}: Props) => {
  const {page = '1', sortingBy = 'byOrder', ...filtersValues} = searchParams
  const brandData = await getBrandData(brandUrl)
  if (!brandData) redirect(`/`)
  const productsData = await getProductsDataByBrandId(brandData.id)
  if (!productsData) redirect(`/`)
  const brand: BrandProps = {
    brandId: brandData.id, brandName: brandData.name, url: brandData.url,
    desc: lang === 'en' ? brandData.desc : brandData.desc_ua
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
      <ProductsList products={productsSlice} brandData={brand} paginationBar={paginationBar}/>
    </FiltersLayout>
  )
}

export default Page;