import React from "react";
import AddPage from "@/app/[lang]/admin/tagUrls/add/AddPage";
import {getTagUrls} from "@/lib/db/tagUrl";
import _ from "lodash";


const Page = async () => {
  const tagUrlsData = await getTagUrls()
  const parents = _.union(tagUrlsData.map(tagUrl=>tagUrl.parent))
  return <AddPage parents={parents}/>

}

export default Page