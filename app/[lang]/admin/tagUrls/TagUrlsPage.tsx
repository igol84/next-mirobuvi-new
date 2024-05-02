'use client'
import {Flex, IconButton, Link} from "@chakra-ui/react";
import React, {useContext} from "react";
import {LangContext} from "@/locale/LangProvider";
import {AddIcon} from "@chakra-ui/icons";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import NextLink from "next/link";
import {TagUrlTypeWithoutText} from "@/app/[lang]/admin/tagUrls/types";
import TagUrl from "@/components/tagUrls/admin/TagUrl";


interface TagUrlsPageProps {
  tagUrls: TagUrlTypeWithoutText[]
}

const TagUrlsPage = ({tagUrls}: TagUrlsPageProps) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("tagAdmin")
  return (
    <Flex direction='column' gap={6}>
      <Link as={NextLink} href={`/${lang}/admin//tagUrls/add`}>
        <IconButton aria-label={d('addNewTag')} icon={<AddIcon/>}/>
      </Link>
      <Flex direction='column' gap={2}>
        {tagUrls.map(tag => <TagUrl key={tag.url} tagUrl={tag}/>)}
      </Flex>
    </Flex>
  )
}

export default TagUrlsPage