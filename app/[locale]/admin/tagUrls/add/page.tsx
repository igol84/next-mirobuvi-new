import React from "react";
import AddPage from "@/app/[locale]/admin/tagUrls/add/AddPage";
import {getTagUrls} from "@/lib/db/tagUrl";
import {getParents} from "@/app/[locale]/admin/tagUrls/utility";


const Page = async () => {
  const tagUrlsData = await getTagUrls()
  const parents = getParents(tagUrlsData)
  return <AddPage parents={['', ...parents]}/>

}

export default Page