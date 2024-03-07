import 'server-only'
import {defaultLanguage} from "@/locale/settings";
// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  ua: async () => await import('./ua.json').then((module) => module.default),
  en: async () => await import('./en.json').then((module) => module.default)
}
export type Lang = keyof typeof dictionaries
export const getDictionary = async (locale: Lang) => {
  return dictionaries[Object.keys(dictionaries).includes(locale) ? locale : defaultLanguage]()
};

export const checkDictionary = (locale: string): Lang => {
  return Object.keys(dictionaries).includes(locale) ? locale as Lang : defaultLanguage
};