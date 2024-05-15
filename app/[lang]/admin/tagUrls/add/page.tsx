import React from "react";
import AddPage from "@/app/[lang]/admin/tagUrls/add/AddPage";
import {getTagUrls} from "@/lib/db/tagUrl";
import {getParents} from "@/app/[lang]/admin/tagUrls/utility";


const Page = async () => {
  const tagUrlsData = await getTagUrls()
  const parents = getParents(tagUrlsData)
  return <AddPage parents={['', ...parents]}/>

}

export default Page