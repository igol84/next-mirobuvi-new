'use client'
import React, {ReactNode, useContext} from 'react';
import {Box, Flex} from "@chakra-ui/react";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {usePathname} from "next/navigation";
import CustomLink from "@/components/base/CustomLink";


interface Props {
  children: ReactNode
}

const Container = ({children}: Props) => {
  const d = useDictionaryTranslate("admin")
  const lang = useContext(LangContext)
  const pages = ['orders', 'tagUrls']
  const currentUrl = usePathname()
  return (
    <Flex direction={{base: "column", xl: "row"}} gap={16}>
      <Box>
        <Flex direction='column' layerStyle='adminMenu'>
          {pages.map(page => {
            const url = `/${lang}/admin/${page}`
            const isCurrentPage = url === currentUrl
            return <CustomLink key={url} pageUrl={url} pageName={d(page)} isCurrentPage={isCurrentPage}/>
          })}
        </Flex>
      </Box>
      <Box p={2} width='full'>{children}</Box>
    </Flex>
  );
};

export default Container;