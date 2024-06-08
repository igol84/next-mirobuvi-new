import ArticleList from "@/components/Articles/ArticleList";
import {getArticles} from "@/lib/db/article";
import {ListItem} from "@/components/Articles/type";
import {checkForAdmin} from "@/utility/auth";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {Locale} from "@/i18n";

type Props = {
  params: {
    locale: Locale
  }
}

export async function generateMetadata({params: {locale}}: Props) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations({locale, namespace: 'articles'})
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      images: ['https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg'],
    },
  }
}

const Page = async ({params: {locale}}: Props) => {
  const isAdmin = await checkForAdmin()
  let articles = await getArticles()
  if (!isAdmin)
    articles = articles.filter(article => article.active)
  const listItems: ListItem[] = articles.map(article => ({
    url: article.url,
    name: locale === 'en' ? article.title_en : article.title_ua,
    image: article.img
  }))
  return (
    <ArticleList listItems={listItems}/>
  )
}

export default Page