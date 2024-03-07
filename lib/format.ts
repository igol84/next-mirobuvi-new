import {Lang} from "@/dictionaries/get-dictionary";

export function formatPrice(price: number, lang: Lang = 'ua') {
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const prefix = lang === 'ua' ? 'грн.' : '₴'
  return `${UAHFormat.format(price)}${prefix}`
}

export const createUrl = (path: string, params: string) => {
  if (params) return path + '?' + params
  return path
}