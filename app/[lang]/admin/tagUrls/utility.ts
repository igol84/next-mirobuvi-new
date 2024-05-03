import _ from "lodash";
import {TagUrl} from "@/lib/db/tagUrl";

export const getParents = (tagUrlsData: TagUrl[]) => {
  return _.union(tagUrlsData.filter(tagUrl => tagUrl.parent === '').map(tagUrl => tagUrl.url))
}