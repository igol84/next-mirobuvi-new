import {MetadataRoute} from 'next'
import {env} from "@/lib/env"
import {defaultLocale, locales} from "@/i18n"
import {getArticles} from "@/lib/db/article";
import {getProducts} from "@/lib/db/product";
import {getBrands} from "@/lib/db/brand";
import {getTagUrls} from "@/lib/db/tagUrl";

export const revalidate = 60 * 60 * 24


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlesUrls = await getArticles().then(articles => articles.map(article => article.url))
  const tagUrls =  await getTagUrls().then(tag => tag.map(tag => tag.url))
  const allBrands = await getBrands()
  const allProducts = await getProducts()
  const brandsUrls = allBrands.filter(brand => brand.active && !brand.private).map(brand => brand.url)
  const productsUrls = allProducts.filter(product => product.active && !product.private).map(product => product.url)
  const pathNames = ['/'].concat(tagUrls, articlesUrls, productsUrls, brandsUrls)

  function getUrl(pathName: string, locale: string) {
    return `${env.URL}/${locale}${pathName === '/' ? '' : `/${pathName}`}`
  }

  return pathNames.map((pathName) => {
    const anotherLocales = locales.filter(locale => locale !== defaultLocale)
    const localesArray = anotherLocales.map(locale => [locale, getUrl(pathName, locale)])
    const languages = Object.fromEntries(localesArray)
    return {
      url: getUrl(pathName, defaultLocale),
      lastModified: new Date(),
      alternates: {
        languages
      }
    }
  })
}