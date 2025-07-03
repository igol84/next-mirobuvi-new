import {useLocale} from "next-intl";
import {Locale} from "@/i18n/request";

export const usePricePrefix = () => {
  const locale = useLocale() as Locale
  return locale === 'en' ? '₴' : 'грн.'
}