import {Locale} from "@/i18n";

export function formatPrice(price: number, locale: Locale = 'ua') {
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const prefix = locale === 'ua' ? 'грн.' : '₴'
  return `${UAHFormat.format(price)}${prefix}`
}

export const createUrl = (path: string, params: string) => {
  if (params) return path + '?' + params
  return path
}