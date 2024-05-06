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
  isEditor: boolean
  children: React.ReactNode
}

export const IsAdminContext = createContext(false)
export const IsEditorContext = createContext(false)

export function Providers({lang, dict, isAdmin, isEditor, children}: Props) {
  return (
    <SessionProvider>
      <IsAdminContext.Provider value={isAdmin}>
        <IsEditorContext.Provider value={isEditor}>
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
        </IsEditorContext.Provider>
      </IsAdminContext.Provider>
    </SessionProvider>
  )
}