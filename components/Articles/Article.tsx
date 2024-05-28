import {Box, Center, Flex, IconButton, Link, Text} from "@chakra-ui/react";
import React, {useContext, useState} from "react";
import {ListItem} from "@/components/Articles/type";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {LangContext} from "@/locale/LangProvider";
import {EditIcon} from "@chakra-ui/icons";
import {IsAdminContext} from "@/app/providers";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  article: ListItem,
  priority: boolean
}

const Article = ({article, priority}: Props) => {
  const lang = useContext(LangContext)
  const isAdmin = useContext(IsAdminContext)
  const d = useDictionaryTranslate("articlesAdmin")
  const dict = {
    'editArticle': d('editArticle'),
  }
  const [isHover, setIsHover] = useState(false)
  return (
    <Box sx={{transitionDuration: '0.2s', transitionTimingFunction: "ease-in-out"}} p={[1, 1, 1, 0, 1]} h='full'
         position='relative' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
         borderRadius={15} shadow={isHover ? '2xl' : 'none'} _dark={{shadow: isHover ? 'dark-lg' : 'none'}}>
      {isAdmin
        && (
          <Box position='absolute' top={2} right={2} hidden={!isHover} zIndex={99999}>
            <Link as={NextLink} href={`/${lang}/articles/${article.url}/edit`} _hover={{color: 'hoverLinkTextColor'}}>
              <IconButton aria-label={dict.editArticle} icon={<EditIcon/>}/>
            </Link>
          </Box>
        )

      }
      <Flex flexDirection='column' gap={4} w={249}>
        <Link as={NextLink} href={`/${lang}/articles/${article.url}`} _hover={{color: 'hoverLinkTextColor'}}>
          <ChakraNextImage
            alt={article.name} borderRadius={[30, 15]} as={NextImage} width={0} height={0} sizes="100vw"
            style={{width: '100%', height: 'auto'}} priority={priority}
            src={`/images/news/${article.image}`}
          />
          <Center><Text>{article.name}</Text></Center>
        </Link>
      </Flex>
    </Box>
  )
}

export default Article