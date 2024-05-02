import {useDictionaryTranslate} from "@/dictionaries/hooks";

export const useDict = () => {
  const d = useDictionaryTranslate("tagAdmin")
  const dg = useDictionaryTranslate("global")
  const dict = {
    'cancel': dg('cancel'),
    'save': dg('save'),
    'del': dg('delete'),
    'gt2': dg('gt2'),
    'lt16': dg('lt16'),
    'exist': dg('exist'),
    'addNewTag': d('addNewTag'),
    'editTag': d('editTag'),
    'url': d('url'),
    'parent': d('parent'),
  }
  return {dict, d}
}