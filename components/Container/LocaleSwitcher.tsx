'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {useContext} from "react";
import {LangContext} from "@/locale/LangProvider";
import {Button} from "@chakra-ui/react";


export default function LocaleSwitcher() {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  const lang = useContext(LangContext)
  const locale = lang === 'en' ? 'ua' : 'en'
  return (
    <Button as={Link} px={1} href={redirectedPathName(locale)} fontSize={[15, 20, 25, 30]} minW={[1, 2]}
            sx={{fontWeight: '2px'}}
    >
      {locale}
    </Button>
  )
}
