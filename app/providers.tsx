'use client'

import React, {createContext} from "react";
import {SessionProvider} from 'next-auth/react'
import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import theme from "@/app/theme";

interface Props {
  isAdmin: boolean
  isEditor: boolean
  children: React.ReactNode
}

export const IsAdminContext = createContext(false)
export const IsEditorContext = createContext(false)

export function Providers({isAdmin, isEditor, children}: Props) {
  return (
    <SessionProvider>
      <IsAdminContext.Provider value={isAdmin}>
        <IsEditorContext.Provider value={isEditor}>
          <CacheProvider>
            <ChakraProvider theme={theme}>
              <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
              {children}
            </ChakraProvider>
          </CacheProvider>
        </IsEditorContext.Provider>
      </IsAdminContext.Provider>
    </SessionProvider>
  )
}