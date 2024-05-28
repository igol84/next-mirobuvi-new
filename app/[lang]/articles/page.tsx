import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import ArticleList from "@/components/Articles/ArticleList";
import {getArticles} from "@/lib/db/article";
import {ListItem} from "@/components/Articles/type";
import {checkForAdmin} from "@/utility/auth";

type Props = {
  params: {
    lang: Lang
  }
}

export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.articles.title,
    description: dict.articles.description,
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}

const Page = async ({params: {lang}}: Props) => {
  const isAdmin = await checkForAdmin()
  let articles = await getArticles()
  if (!isAdmin)
    articles = articles.filter(article => article.active)
  const listItems: ListItem[] = articles.map(article => ({
    url: article.url,
    name: lang === 'en' ? article.title_en : article.title_ua,
    image: article.img
  }))
  return (
    <ArticleList listItems={listItems}/>
  )
}

export default Page