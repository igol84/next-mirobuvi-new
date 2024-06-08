'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {useLocale, useTranslations} from "next-intl";
import {Locale, locales} from "@/i18n";


export default function LocaleSwitcher() {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  const t = useTranslations('switcher')
  const locale = useLocale() as Locale
  return (
    <div>
      <p>{t('localeSwitcher')}</p>
      <ul>
        {locales.map((lang) => {
          if (lang !== locale)
            return (
              <li key={lang}>
                <Link href={redirectedPathName(lang)}>{lang}</Link>
              </li>
            )
        })}
      </ul>
    </div>
  )
}
