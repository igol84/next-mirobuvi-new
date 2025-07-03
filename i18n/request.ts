
import {getRequestConfig} from 'next-intl/server';
import { redirect } from 'next/navigation'
// Can be imported from a shared config
export const locales = ['en', 'ua'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'ua'

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    redirect(`/`)
  }

  return {
    messages: (await import(`@/dictionaries/${locale}.json`)).default,
    timeZone: 'Europe/Kiev',
  };
});