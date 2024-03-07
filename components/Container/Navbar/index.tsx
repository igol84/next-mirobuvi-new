import React from 'react';
import {Flex, IconButton} from "@chakra-ui/react";
import MenuItems from "@/components/Container/Navbar/MenuItems";
import './style.css'
import {Item} from "@/components/Container/Navbar/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import FavoriteProductsIcon from "@/components/Container/FavoriteProductsIcon";
import SearchInput from "@/components/Container/Navbar/SearchInput";
import {TagUrl} from "@/app/[lang]/[urlTag]/types";

type Props = {
  brandsItems: Item[]
  tagsUrl: TagUrl[]
  isMobile?: boolean
  onClose: () => void
}

const Navbar = ({brandsItems, isMobile, tagsUrl, onClose}: Props) => {
  const d = useDictionaryTranslate("home")
  const updatedBrandItems = brandsItems.map(item => {
    const url = `brands/${item.url}`
    return {...item, url}
  })
  const brandsNav: Item = {title: d('brands'), url: 'brands/', submenu: updatedBrandItems}
  const tagsItems: Item[] = tagsUrl.filter(tag => tag.search !== '' && tag.search !== 'header').map(tag => {
    const submenu: undefined | Item[] = tag.submenu?.map(subTag => ({url: subTag.url, title: subTag.search}))
    return {url: tag.url, title: tag.search, submenu: submenu?.length ? submenu : undefined}
  })

  const pageItems: Item[] = tagsUrl.filter(tag => tag.search === '').map(tag => ({url: tag.url, title: tag.desc}))
  const tagNav: Item = {title: d('products'), url: 'products/', submenu: tagsItems}
  const allItems = [...pageItems, tagNav, brandsNav]
  return (
    <Flex as='ul' sx={{listStyle: 'none'}} flexDirection={isMobile ? 'column' : 'row'}>
      {allItems.map((menu, index) => {
        const depthLevel = 0;
        return <MenuItems items={menu} key={index} depthLevel={depthLevel} isMobile={isMobile} onClose={onClose}/>;
      })}
      <Flex justifyContent='center' alignItems='center' py={{base: 2, sm: 0}}>
        <SearchInput onClose={onClose}/>
      </Flex>
      <Flex display={{base: "inherit", sm: "none"}} justifyContent='center' alignItems='center' onClick={onClose}>
        <FavoriteProductsIcon/>
      </Flex>
      <IconButton as={'a'} className="link _icon-viber" aria-label={d("themeIcon")} isRound={true}
                  href="viber://add?number=380933375372" display={{base: "inherit", sm: "none"}}/>
    </Flex>
  );
};

export default Navbar;