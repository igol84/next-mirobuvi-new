import ArticleForm from "@/components/Articles/admin/ArticleForm";
import {defaultValues} from "@/components/Articles/admin/types";
import {getArticles} from "@/lib/db/article";

const Page = async () => {
  const urlList = await getArticles().then(articles => articles.map(article => article.url))
  return (
    <ArticleForm defaultValues={defaultValues} urlList={urlList}/>
  )
}

export default Page