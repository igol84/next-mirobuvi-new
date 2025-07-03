'use client'
import {Flex, IconButton, Link} from "@chakra-ui/react";
import React from "react";
import {AddIcon} from "@chakra-ui/icons";
import NextLink from "next/link";
import {TagUrlTypeWithoutText} from "@/app/[locale]/admin/tagUrls/types";
import TagUrl from "@/components/tagUrls/admin/TagUrl";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";


interface TagUrlsPageProps {
  tagUrls: TagUrlTypeWithoutText[]
}

const TagUrlsPage = ({tagUrls}: TagUrlsPageProps) => {
  const t = useTranslations('tagAdmin')
  const locale = useLocale() as Locale
  return (
    <Flex direction='column' gap={6}>
      <Link as={NextLink} href={`/${locale}/admin//tagUrls/add`}>
        <IconButton aria-label={t('addNewTag')} icon={<AddIcon/>}/>
      </Link>
      <Flex direction='column' gap={2}>
        {tagUrls.map(tag => <TagUrl key={tag.url} tagUrl={tag}/>)}
      </Flex>
    </Flex>
  )
}

export default TagUrlsPage