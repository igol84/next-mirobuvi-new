import {getArticle, getArticles} from "@/lib/db/article";
import {Box, Heading} from "@chakra-ui/react";
import {redirect} from "next/navigation";
import React from "react";
import '@/app/theme/style.scss'
import {checkForAdmin} from "@/utility/auth";
import {getBreadCrumb} from "@/app/[locale]/articles/[url]/serverFunctions";
import BreadCrumb from "@/components/base/BreadCrumb";
import {Locale} from "@/i18n";
import {unstable_setRequestLocale} from "next-intl/server";

type Props = {
  params: {
    url: string
    locale: Locale
  }
}

export async function generateMetadata({params: {url, locale}}: Props) {
  unstable_setRequestLocale(locale)
  const article = await getArticle(url)
  if (!article) redirect('/')
  const imgUrl = `/images/news/${article.img}`
  const title = locale === 'en' ? article.title_en : article.title_ua
  const description = locale === 'en' ? article.desc_en : article.desc_ua
  return {
    title,
    description,
    openGraph: {
      images: [imgUrl],
    },
  }
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({url: article.url}))
}

const Page = async ({params: {url, locale}}: Props) => {
  const isAdmin = await checkForAdmin()
  const articleData = await getArticle(url)
  if (!articleData) redirect(`/`)
  if (!isAdmin && !articleData.active) redirect(`/`)
  const header = locale === 'ua' ? articleData.title_ua : articleData.title_en
  const text = locale === 'ua' ? articleData.text_ua : articleData.text_en
  const breadCrumbs = await getBreadCrumb(locale, header, articleData.url)

  return (
    <Box>
      <BreadCrumb breadCrumbs={breadCrumbs}/>
      <header>
        <Heading>{header}</Heading>
      </header>
      <section>
        <div className='desc' dangerouslySetInnerHTML={{__html: text}}/>
      </section>
    </Box>
  )
}

export default Page