import React from 'react';
import Home from "@/app/[locale]/Home";
import {BrandCardPropsWithFirst, getBrandsImageUrl} from "@/components/Brands/types";
import {getBrands} from "@/lib/db/brand";
import {checkForAdmin, checkForAuth} from "@/utility/auth";
import _ from "lodash";
import {Locale} from "@/i18n";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {getTagUrl} from "@/lib/db/tagUrl";
import {env} from "@/lib/env";

type Props = {
  params: {
    locale: Locale
  }
}

export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslations({locale, namespace: 'home'})
  const tagUrlData = await getTagUrl('home')
  const title = locale === 'en' ? tagUrlData?.title_en : tagUrlData?.title_ua
  const description = locale === 'en' ? tagUrlData?.desc_en : tagUrlData?.desc_ua
  return {
    metadataBase: new URL(env.URL),
    title: title ? title : t('title'),
    description: description ? description : t('description'),
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}

const Page = async ({params: {locale}}: Props) => {
  unstable_setRequestLocale(locale)
  const t = await getTranslations({locale, namespace: 'home'})
  const isAdminUser = await checkForAdmin()
  const isAuth = await checkForAuth()
  let brandsData = await getBrands()
  if (!isAuth)
    brandsData = brandsData.filter(brand => !brand.private)
  if (!isAdminUser)
    brandsData = brandsData.filter(brand => brand.active)
  brandsData = _.orderBy(brandsData, 'order_number')
  const brands: BrandCardPropsWithFirst[] = brandsData.map((brand, index) => {
    const imgUrl = getBrandsImageUrl(brand.url, brand.updatedAt?.getTime())
    return {
      brandId: brand.id, brandName: brand[`name_${locale}`], url: brand.url, isFirst: index < 6, imgUrl
    }
  })
  const TagUrl = await getTagUrl('home')
  const desc = TagUrl ? locale === 'en' ? TagUrl.text_en : TagUrl.text_ua : t('description')
  const title = TagUrl ? locale === 'en' ? TagUrl.title_en : TagUrl.title_ua : t('title')
  return (
    <Home brands={brands} header={title} desc={desc}/>
  );
};

export default Page;