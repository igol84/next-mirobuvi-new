import {TagUrlTypeWithoutText} from "@/app/[locale]/admin/tagUrls/types";
import {Box, Divider, Flex, IconButton, Link} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {EditIcon} from "@chakra-ui/icons";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";

interface Props {
  tagUrl: TagUrlTypeWithoutText
}

const TagUrl = ({tagUrl}: Props) => {
  const t = useTranslations('tagAdmin')
  const locale = useLocale() as Locale
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
        <Link as={NextLink} href={`/${locale}/admin//tagUrls/${tagUrl.url}`}>
          <IconButton variant='green' aria-label={t('editTag')} icon={<EditIcon/>}/>
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