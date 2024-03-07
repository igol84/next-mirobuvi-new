'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {languages} from "@/locale/settings";
import {useContext} from "react";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";


export default function LocaleSwitcher() {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("switcher")
  return (
    <div>
      <p>{d('localeSwitcher')}</p>
      <ul>
        {languages.map((locale) => {
          if (locale !== lang)
            return (
              <li key={locale}>
                <Link href={redirectedPathName(locale)}>{locale}</Link>
              </li>
            )
        })}
      </ul>
    </div>
  )
}
