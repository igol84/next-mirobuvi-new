'use client'

import React, {createContext} from "react";
import {SessionProvider} from 'next-auth/react'
import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import theme from "@/app/theme";

interface Props {
  isAdmin: boolean
  isEditor: boolean
  userDiscount: number
  children: React.ReactNode
}

export const IsAdminContext = createContext<boolean>(false)
export const IsEditorContext = createContext<boolean>(false)
export const userDiscountContext = createContext<number>(0)

export function Providers({isAdmin, isEditor, userDiscount, children}: Props) {
  return (
    <SessionProvider>
      <IsAdminContext.Provider value={isAdmin}>
        <IsEditorContext.Provider value={isEditor}>
          <userDiscountContext.Provider value={userDiscount}>
            <CacheProvider>
              <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                {children}
              </ChakraProvider>
            </CacheProvider>
          </userDiscountContext.Provider>
        </IsEditorContext.Provider>
      </IsAdminContext.Provider>
    </SessionProvider>
  )
}