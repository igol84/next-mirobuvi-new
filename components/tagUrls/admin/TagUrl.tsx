import {TagUrlTypeWithoutText} from "@/app/[lang]/admin/tagUrls/types";
import {Box, Divider, Flex, IconButton, Link} from "@chakra-ui/react";
import React, {useContext} from "react";
import NextLink from "next/link";
import {EditIcon} from "@chakra-ui/icons";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  tagUrl: TagUrlTypeWithoutText
}

const TagUrl = ({tagUrl}: Props) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("tagAdmin")
  return (
    <Box layerStyle='adminOrderWithItems' boxShadow='2xl'>
      <Flex gap={2} layerStyle='adminOrder' direction={{base: "column", md: "row"}} justifyContent='space-between'>
        <Box>
          {tagUrl.url}
        </Box>
        <Box>
          {tagUrl.parent}
        </Box>
        <Box>
          {tagUrl.orderNumber}
        </Box>
        <Link as={NextLink} href={`/${lang}/admin//tagUrls/${tagUrl.url}`}>
          <IconButton variant='green' aria-label={d('editTag')} icon={<EditIcon/>}/>
        </Link>
      </Flex>
      <Divider/>
      <Box p={2}>
        <Box>
          {tagUrl.searchEn}
        </Box>
        <Box>
          {tagUrl.searchUa}
        </Box>
      </Box>
    </Box>
  )
}

export default TagUrl