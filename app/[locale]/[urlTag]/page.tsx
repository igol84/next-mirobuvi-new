import React from 'react';
import '@/app/theme/style.scss'
import {redirect} from "next/navigation";
import {convertToTagUrlFromDB, ParentTagForBreadCrumb, TagUrl} from "@/app/[locale]/[urlTag]/types";
import ProductsList from "@/components/Products/ProductsList";
import {getFilterProducts,} from "@/lib/server/filters/serverFunctions/serverFunctions";
import {getViewedProducts} from "@/lib/productsGetter";
import {ProductType} from "@/components/Products/types";
import {createProduct} from "@/lib/productCardData";
import {getPageData, sortingProducts} from "@/lib/server/serverFunctions";
import {SortingType} from "@/components/base/SortingSelect/types";
import SimplePage from "@/app/[locale]/[urlTag]/SimplePage";
import {
  getBreadCrumbData,
  getBreadCrumbDataSinglePage,
  isSinglePage,
  searchProducts,
  searchProductsByTag
} from "@/app/[locale]/[urlTag]/serverFunctions";
import {FiltersValues} from "@/lib/server/filters/serverFunctions/types";
import FiltersLayout from "@/components/Products/FiltersLayout";
import {getProducts} from "@/lib/db/product";
import {getTagUrl, getTagUrls} from "@/lib/db/tagUrl";
import {checkForAdmin, checkForAuth, getAuthUser} from "@/utility/auth";
import {getArticles} from "@/lib/db/article";
import {getBrands} from "@/lib/db/brand";
import {Locale} from "@/i18n";
import {unstable_setRequestLocale} from "next-intl/server";
import {getUserDiscount} from "@/lib/db/user";

type Props = {
  params: {
    locale: Locale,
    urlTag: string
  },
  searchParams: {
    page?: string
    sortingBy?: SortingType
    search?: string
  } & FiltersValues
}

export async function generateMetadata({params: {locale, urlTag}}: Props) {
  unstable_setRequestLocale(locale)
  const fetchData = await getTagUrl(urlTag)
  const articlesUrls = await getArticles().then(articles => articles.map(article => article.url))
  const productsUrls = await getProducts().then(product => product.map(product => product.url))
  const brandsUrls = await getBrands().then(brand => brand.map(brand => brand.url))
  if (articlesUrls.includes(urlTag)) {
    redirect(`/${locale}/articles/${urlTag}`)
  }
  if (productsUrls.includes(urlTag)) {
    redirect(`/${locale}/products/${urlTag}`)
  }
  if (brandsUrls.includes(urlTag)) {
    redirect(`/${locale}/brands/${urlTag}`)
  }
  if (!fetchData) redirect(`/`)
  const tagData: TagUrl = convertToTagUrlFromDB(fetchData, locale)
  return {
    title: tagData.search && tagData.search !== 'header' ? tagData.search : tagData.desc,
    description: tagData.desc,
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}

export async function generateStaticParams() {
  const tagsUrlData = await getTagUrls()
  return tagsUrlData.filter(tag => tag.search_en !== '').map(tag => ({urlTag: tag.url}))
}


const Page = async ({params: {locale, urlTag}, searchParams}: Props) => {
  const {
    page = '1', sortingBy = 'byOrder', search, ...filtersValues
  } = searchParams
  const isAdmin = await checkForAdmin()
  const isAuth = await checkForAuth()
  const userId = await getAuthUser()
  const userDiscount = userId ? await getUserDiscount(Number(userId)) : 0
  const tagsUrlData = await getTagUrls()
  const fetchData = tagsUrlData.find(tag => tag.url === urlTag)
  if (!fetchData) redirect(`/`)
  const tagData = convertToTagUrlFromDB(fetchData, locale)
  const viewedProducts = await getViewedProducts(locale, isAdmin, isAuth, userDiscount)
  if (isSinglePage(tagData)) {
    const breadCrumbs = getBreadCrumbDataSinglePage(tagData.desc)
    return (
      <SimplePage desc={tagData.text} breadCrumbs={breadCrumbs} viewedProducts={viewedProducts}/>
    )
  }
  const parentData = tagsUrlData.find(tag => tag.url === fetchData.parent)
  const parentTagForBreadCrumb: ParentTagForBreadCrumb | undefined = parentData ? {
    name: locale === 'en' ? parentData.search_en : parentData.search_ua,
    url: parentData.url
  } : undefined
  const breadCrumbs = await getBreadCrumbData(locale, tagData.search, parentTagForBreadCrumb)

  let productsData = await getProducts()
  if (!isAuth)
    productsData = productsData.filter(product => !product.private && !product.brand.private)
  if (!isAdmin)
    productsData = productsData.filter(product => product.active && product.brand.active)
  if (search)
    productsData = searchProducts(productsData, search)
  if (tagData.search !== 'header')
    productsData = searchProductsByTag(productsData, tagData.search)
  let products: ProductType[] = productsData.map(product => createProduct(product, locale, userDiscount))

  const filterProducts = getFilterProducts(products, filtersValues)
  products = filterProducts.products
  products = sortingProducts(products, sortingBy)
  const [productsSlice, paginationBar] = await getPageData(products, parseInt(page))
  return (
    <FiltersLayout desc={tagData.text} breadCrumbs={breadCrumbs} viewedProducts={viewedProducts}
                   sortingBy={sortingBy} filterMenuType={filterProducts.filterMenuType}
    >
      <ProductsList products={productsSlice} paginationBar={paginationBar}/>
    </FiltersLayout>
  )
};

export default Page;