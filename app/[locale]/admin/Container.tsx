'use client'
import React, {ReactNode} from 'react';
import {Box, Flex} from "@chakra-ui/react";
import {usePathname} from "next/navigation";
import CustomLink from "@/components/base/CustomLink";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";


interface Props {
  children: ReactNode
}

const Container = ({children}: Props) => {
  const t = useTranslations('admin')
  const locale = useLocale() as Locale
  const pages = ['orders', 'tagUrls']
  const currentUrl = usePathname()
  return (
    <Flex direction={{base: "column", xl: "row"}} gap={16}>
      <Box>
        <Flex direction='column' layerStyle='adminMenu'>
          {pages.map(page => {
            const url = `/${locale}/admin/${page}`
            const isCurrentPage = url === currentUrl
            return <CustomLink key={url} pageUrl={url} pageName={t(page)} isCurrentPage={isCurrentPage}/>
          })}
        </Flex>
      </Box>
      <Box p={2} width='full'>{children}</Box>
    </Flex>
  );
};

export default Container;