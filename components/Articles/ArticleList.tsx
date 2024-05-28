'use client'

import React, {useContext} from "react";
import {IsAdminContext} from "@/app/providers";
import {Box, IconButton, Link, Wrap, WrapItem} from "@chakra-ui/react";
import NextLink from "next/link";
import {AddIcon} from "@chakra-ui/icons";
import {LangContext} from "@/locale/LangProvider";
import Article from "@/components/Articles/Article";
import {ListItem} from "@/components/Articles/type";


interface ArticleListProps {
  listItems: ListItem[]
}

const ArticleList = ({listItems}: ArticleListProps) => {
  const lang = useContext(LangContext)
  const isAdmin = useContext(IsAdminContext)
  return (
    <Box>
      {isAdmin && (
        <Box pb={2}>
          <Link as={NextLink} href={`/${lang}/articles/add`} _hover={{color: 'hoverLinkTextColor'}}>
            <IconButton aria-label={'addBrand'} icon={<AddIcon/>}/>
          </Link>
        </Box>
      )}
      <Wrap justify={{base: 'center', lg: 'flex-start'}} spacing={[0, 0, 0, 1, 0]}>
        {listItems.map((article, index) => {
          const priority = index < 6
          return (
            <WrapItem key={article.url}>
              <article>
                <Article article={article} priority={priority}/>
              </article>
            </WrapItem>
          )
        })}
      </Wrap>
    </Box>
  )
}

export default ArticleList