import {useDictionaryTranslate} from "@/dictionaries/hooks";

export const useDict = () => {
  const d = useDictionaryTranslate("articlesAdmin")
  const dg = useDictionaryTranslate("global")
  const dict = {
    'titleUa': d('titleUa'),
    'addNewArticle': d('addNewArticle'),
    'titleEn': d('titleEn'),
    'img': d('img'),
    'editArticle': d('editArticle'),
    'gt2': dg('gt2'),
    'cancel': dg('cancel'),
    'save': dg('save'),
    'del': dg('delete'),
    'consist': dg('consist'),
  }
  return {dict, d}
}