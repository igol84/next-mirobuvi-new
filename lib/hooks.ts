import {useLocale} from "next-intl";
import {Locale} from "@/i18n";

export const usePricePrefix = () => {
  const locale = useLocale() as Locale
  return locale === 'en' ? '₴' : 'грн.'
}