import {useTranslations} from "next-intl";

export const useDict = () => {
  const d = useTranslations('brandsAdmin')
  const dg = useTranslations('global')
  const dict = {
    'nameUa': d('nameUa'),
    'nameEn': d('nameEn'),
    'file': d('file'),
    'url': d('url'),
    'gt2': d('gt2'),
    'consist': d('consist'),
    'file1': d('file1'),
    'addBrand': d('addBrand'),
    'editBrand': d('editBrand'),
    'cancel': dg('cancel'),
    'save': dg('save'),
    'del': dg('delete'),
  }
  return {dict, d}
}