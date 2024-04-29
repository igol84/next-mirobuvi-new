import {useDictionaryTranslate} from "@/dictionaries/hooks";

export const useDict = () => {
  const d = useDictionaryTranslate("productAdmin")
  const dc = useDictionaryTranslate("filterColor")
  const ds = useDictionaryTranslate("filterSeason")
  const dg = useDictionaryTranslate("global")
  const dict = {
    'nameUa': d('nameUa'),
    'nameEn': d('nameEn'),
    'gt2': d('gt2'),
    'consist': d('consist'),
    'url': d('url'),
    'file': d('file'),
    'file1': d('file1'),
    'cancel': dg('cancel'),
    'save': dg('save'),
    'del': dg('delete'),
  }
  return {dict, d, dc, ds}
}