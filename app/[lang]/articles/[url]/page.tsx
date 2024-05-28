import {Lang} from "@/dictionaries/get-dictionary";
import {getArticle, getArticles} from "@/lib/db/article";
import {Box, Heading} from "@chakra-ui/react";
import {redirect} from "next/navigation";
import React from "react";
import '@/app/theme/style.scss'
type Props = {
  params: {
    url: string
    lang: Lang
  }
}

export async function generateMetadata({params: {url, lang}}: Props) {
  const article = await getArticle(url)
  if (!article) redirect('/')
  const imgUrl = `/images/news/${article.img}`
  const title = lang === 'en' ? article.title_en : article.title_ua
  const description = lang === 'en' ? article.desc_en : article.desc_ua
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

const Page = async ({params: {url, lang}}: Props) => {
  const articleData = await getArticle(url)
  if (!articleData) redirect(`/`)
  const header = lang==='ua' ? articleData.title_ua : articleData.title_en
  const text = lang==='ua' ? articleData.text_ua : articleData.text_en
  return (
    <Box>
      <Heading>{header}</Heading>
      <div className='desc' dangerouslySetInnerHTML={{__html: text}}/>
    </Box>
  )
}

export default Page