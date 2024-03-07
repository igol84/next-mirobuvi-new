'use client'
import React, {ReactNode, useContext} from 'react';
import {Box, Flex, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  children: ReactNode
}

const Container = ({children}: Props) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("admin")
  return (
    <Flex direction={{base: "column", xl: "row"}} gap={16}>
      <Box>
        <Flex direction='column' layerStyle='adminMenu'>
          <Link as={NextLink} href={`/${lang}/admin/orders`}>{d('orders')}</Link>
        </Flex>
      </Box>
      <Box p={2} width='full'>{children}</Box>
    </Flex>
  );
};

export default Container;