import {useContext} from "react";
import {LangContext} from "@/locale/LangProvider";

export const usePricePrefix = () => {
  const lang = useContext(LangContext)
  return lang === 'en' ? '₴' : 'грн.'
}