import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {getTagUrls} from "@/lib/db/tagUrl";
import React from "react";
import TagUrlsPage from "@/app/[lang]/admin/tagUrls/TagUrlsPage";
import {TagUrlTypeWithoutText} from "@/app/[lang]/admin/tagUrls/types";
import _ from "lodash";

export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.admin.title,
    description: dict.admin.description,
  }
}

interface Props {
  params: { lang: Lang }
}

const Page = async ({params: {lang}}: Props) => {
  const dict = await getDictionary(lang)
  const tagsData = await getTagUrls()
  if (!tagsData) {
    return <div>{dict.tagAdmin.tagsNotFound}</div>
  }
  const tagUrls: TagUrlTypeWithoutText[] = tagsData.map(tag => ({
    url: tag.url,
    parent: tag.parent,
    orderNumber: tag.order_number,
    searchEn: tag.search_en,
    searchUa: tag.search_ua,
    descEn: tag.desc_en,
    descUa: tag.desc_ua,
  }))
  const sortedTagUrls = _.sortBy(tagUrls, ['url, parent, orderNumber'])
  return (
    <TagUrlsPage tagUrls={sortedTagUrls}/>
  )
}

export default Page