'use client'

import React, {createContext} from "react";
import {SessionProvider} from 'next-auth/react'
import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import DictProvider from "@/dictionaries/DictProvider";
import {Dictionary} from "@/dictionaries/interface";
import LangProvider from "@/locale/LangProvider";
import {Lang} from "@/dictionaries/get-dictionary";
import theme from "@/app/theme";

interface Props {
  lang: Lang
  dict: Dictionary
  isAdmin: boolean
  children: React.ReactNode
}

export const IsAdminContext = createContext(false)

export function Providers({lang, dict, isAdmin, children}: Props) {
  return (
    <SessionProvider>
      <IsAdminContext.Provider value={isAdmin}>
        <LangProvider lang={lang}>
          <DictProvider dict={dict}>
            <CacheProvider>
              <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                {children}
              </ChakraProvider>
            </CacheProvider>
          </DictProvider>
        </LangProvider>
      </IsAdminContext.Provider>
    </SessionProvider>
  )
}