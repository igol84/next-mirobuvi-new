import React from 'react';
import {Box, Button, Flex, IconButton, Text} from "@chakra-ui/react";
import MenuItems from "@/components/Container/Navbar/MenuItems";
import './style.css'
import {Item} from "@/components/Container/Navbar/types";
import FavoriteProductsIcon from "@/components/Container/FavoriteProductsIcon";
import SearchInput from "@/components/Container/Navbar/SearchInput";
import {TagUrl} from "@/app/[locale]/[urlTag]/types";
import NextLink from "next/link";
import {useLocale, useTranslations} from "next-intl";

type Props = {
  brandsItems: Item[]
  tagsUrl: TagUrl[]
  isMobile?: boolean
  onClose: () => void
}

const Navbar = ({brandsItems, isMobile, tagsUrl, onClose}: Props) => {
  const t = useTranslations('home')
  const locale = useLocale()
  const updatedBrandItems = brandsItems.map(item => {
    const url = `brands/${item.url}`
    return {...item, url}
  })
  const brandsNav: Item = {title: t('brands'), url: 'brands/', submenu: updatedBrandItems}
  const tagsItems: Item[] = tagsUrl.filter(tag => tag.search !== '' && tag.search !== 'header').map(tag => {
    const submenu: undefined | Item[] = tag.submenu?.map(subTag => ({url: subTag.url, title: subTag.search}))
    return {url: tag.url, title: tag.search, submenu: submenu?.length ? submenu : undefined}
  })

  const pageItems: Item[] = tagsUrl.filter(tag => tag.search === '').map(tag => ({url: tag.url, title: tag.desc}))
  const tagNav: Item = {title: t('products'), url: 'products/', submenu: tagsItems}
  const allItems = [...pageItems, tagNav, brandsNav]
  return (
    <Flex as='ul' sx={{listStyle: 'none'}} flexDirection={isMobile ? 'column' : 'row'}>
      {allItems.map((menu, index) => {
        const depthLevel = 0;
        return <MenuItems items={menu} key={index} depthLevel={depthLevel} isMobile={isMobile} onClose={onClose}/>
      })}
      <Box as={'li'} position='relative' className="menu-items">
        <Button h={isMobile ? 1 : 'none'} variant='navButton' aria-haspopup="menu" pl={2}
                aria-expanded={"true"} w='100%'>
          <Text as={NextLink} href={`/${locale}/articles`} onClick={onClose}
                w={!isMobile ? 'full' : undefined} textAlign={!isMobile ? 'left' : undefined}
          >
            {t('articles')}
          </Text>
        </Button>
      </Box>
      <Flex justifyContent='center' alignItems='center' py={{base: 2, sm: 0}}>
        <SearchInput onClose={onClose}/>
      </Flex>
      <Flex display={{base: "inherit", sm: "none"}} justifyContent='center' alignItems='center' onClick={onClose}>
        <FavoriteProductsIcon/>
      </Flex>
      <IconButton as={'a'} className="link _icon-viber" aria-label={t("themeIcon")} isRound={true} variant='outline'
                  href="viber://add?number=380933375372" display={{base: "inherit", sm: "none"}}/>
    </Flex>
  );
};

export default Navbar;