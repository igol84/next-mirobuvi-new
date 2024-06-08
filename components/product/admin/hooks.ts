import {useTranslations} from "next-intl";

export const useDict = () => {
  const d = useTranslations("productAdmin")
  const dc = useTranslations("filterColor")
  const ds = useTranslations("filterSeason")
  const dg = useTranslations("global")
  const dict = {
    'nameUa': d('nameUa'),
    'nameEn': d('nameEn'),
    'nameRu': d('nameRu'),
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