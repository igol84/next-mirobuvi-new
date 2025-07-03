'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {Button} from "@chakra-ui/react";
import {useLocale} from "next-intl";
import {Locale} from "@/i18n/request";


export default function LocaleSwitcher() {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  const locale = useLocale() as Locale
  const anotherLocale = locale === 'en' ? 'ua' : 'en'
  const hrefLang = locale === 'en' ? 'uk' : 'en'
  return (
    <Button as={Link} px={1} href={redirectedPathName(anotherLocale)} fontSize={[15, 20, 25, 30]} minW={[1, 2]}
            sx={{fontWeight: '2px'}} variant='outline' rel="alternate" hrefLang={hrefLang}
    >
      {locale}
    </Button>
  )
}
