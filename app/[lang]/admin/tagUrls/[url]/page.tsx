import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {getTagUrl, getTagUrls} from "@/lib/db/tagUrl";
import React from "react";
import EditTagUrlPage from "@/app/[lang]/admin/tagUrls/[url]/EditTagUrlPage";
import {SafeParseReturnType} from "zod";
import {schema, TagUrlsFormSchema} from "@/components/tagUrls/admin/types";
import _ from "lodash";

type Props = {
  params: {
    lang: Lang
    url: string
  }
}

const Page = async ({params: {lang, url}}: Props) => {
  const dict = await getDictionary(lang)
  const tagUrlData = await getTagUrl(url)

  if (!tagUrlData) {
    return <div>{dict.tagAdmin.tagsNotFound}</div>
  }
  const TagUrlForm: TagUrlsFormSchema = {
    selectedUrl: tagUrlData.url,
    url: tagUrlData.url,
    parent: tagUrlData.parent,
    orderNumber: tagUrlData.order_number,
    searchEn: tagUrlData.search_en,
    searchUa: tagUrlData.search_ua,
    descEn: tagUrlData.desc_en,
    descUa: tagUrlData.desc_ua,
    textEn: tagUrlData.text_en,
    textUa: tagUrlData.text_ua,
  }
  const result: SafeParseReturnType<TagUrlsFormSchema, TagUrlsFormSchema> = schema.safeParse(TagUrlForm)
  if (!result.success)
    return <div>Data Error</div>
  const defaultValues = result.data
  const tagUrlsData = await getTagUrls()
  const parents = _.union(tagUrlsData.map(tagUrl=>tagUrl.parent))
  return (
    <EditTagUrlPage defaultValues={defaultValues} parents={parents}/>
  )
}

export default Page