import {getAllTagUrls} from "@/lib/db/tagUrl";
import React from "react";
import TagUrlsPage from "@/app/[locale]/admin/tagUrls/TagUrlsPage";
import {TagUrlTypeWithoutText} from "@/app/[locale]/admin/tagUrls/types";
import _ from "lodash";
import {Locale} from "@/i18n/request";
import {getTranslations} from "next-intl/server";

interface Props {
  params: { locale: Locale }
}

export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslations({locale, namespace: 'admin'})
  return {
    title: t('title'),
    description: t('description'),
  }
}


const Page = async ({params: {locale}}: Props) => {
  const t = await getTranslations({locale, namespace: 'tagAdmin'})
  const tagsData = await getAllTagUrls()
  if (!tagsData) {
    return <div>{t('tagsNotFound')}</div>
  }
  const tagUrls: TagUrlTypeWithoutText[] = tagsData.map(tag => ({
    url: tag.url,
    parent: tag.parent,
    orderNumber: tag.order_number,
    titleEn: tag.search_en,
    titleUa: tag.title_en,
    searchEn: tag.title_ua,
    searchUa: tag.search_ua,
    descEn: tag.desc_en,
    descUa: tag.desc_ua,
  }))
  const sortedTagUrls = _.sortBy(tagUrls, ['parent', 'orderNumber'])
  return (
    <TagUrlsPage tagUrls={sortedTagUrls}/>
  )
}

export default Page