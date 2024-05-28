import {getArticle, getArticles} from "@/lib/db/article";
import {redirect} from "next/navigation";
import ArticleForm from "@/components/Articles/admin/ArticleForm";
import {ArticleFormSchema} from "@/components/Articles/admin/types";

type Props = {
  params: {
    url: string
  }
}

const Page = async ({params: {url}}: Props) => {
  const articleData = await getArticle(url)
  if (!articleData) redirect(`/`)
  const allUrlList = await getArticles().then(articles => articles.map(article => article.url))
  const urlList = allUrlList.filter(url => url !== articleData.url)
  const defaultValues: ArticleFormSchema = {
    selectedUrl: articleData.url,
    active: articleData.active,
    url: articleData.url,
    titleUa: articleData.title_ua,
    titleEn: articleData.title_en,
    metaDescUa: articleData.desc_ua,
    metaDescEn: articleData.desc_en,
    textUa: articleData.text_ua,
    textEn: articleData.text_en,
    img: articleData.img,
  }
  return (
    <ArticleForm defaultValues={defaultValues} urlList={urlList}/>
  )
}

export default Page