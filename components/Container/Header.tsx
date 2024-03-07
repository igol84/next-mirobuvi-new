import React, {useContext} from 'react';
import {Box, Flex, IconButton, useColorMode, useDisclosure} from "@chakra-ui/react";
import {HiMenu} from "react-icons/hi";
import Link from "next/link";
import LocaleSwitcher from "@/components/Container/LocaleSwitcher";
import ShoppingCartButton from "@/components/Container/ShoppingCartButton";
import {getCartProductsCount} from "@/components/Container/Navbar/functions";
import Cart from "@/components/Container/Navbar/Cart";
import UserMenuButton from "@/components/Container/Navbar/UserMenuButton";
import Navbar from "@/components/Container/Navbar";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import styled from '@emotion/styled'
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {LangContext} from "@/locale/LangProvider";
import {ProductCart} from "@/lib/cartFunctions";
import {Item} from "@/components/Container/Navbar/types";
import FavoriteProductsIcon from "@/components/Container/FavoriteProductsIcon";
import {TagUrl} from "@/app/[lang]/[urlTag]/types";

type Props = {
  onMenuOpen: () => void
  onMenuClose: () => void
  cartProducts: ProductCart[]
  brandsItems: Item[]
  tagsUrl: TagUrl[]
}

const Header = ({onMenuOpen, onMenuClose, cartProducts, brandsItems, tagsUrl}: Props) => {
  const StickNav = styled(Flex)` position: sticky;
    z-index: 10;
    top: 0;`
  const {isOpen, onToggle, onClose} = useDisclosure()
  const {colorMode, toggleColorMode} = useColorMode()
  const ThemeIcon = colorMode === 'dark' ? SunIcon : MoonIcon
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("home")
  return (
    <StickNav flexDirection='column' justifyContent='center' alignItems='center'>
      <Flex direction='column' w='full' backgroundColor='bgBodyColor' gap='2' p={0}>
        <Flex pt={4} backgroundColor='bgBodyColor' flexDirection='column'>
          <Flex as='header' flex={1} pt={4} alignItems='center' color='primary' p={2} justifyContent='space-between'
                roundedTop={16} backgroundColor='bodyColor' boxShadow={'base'}>
            <IconButton onClick={onMenuOpen} fontSize={[28, 36, 48, 56]} display={{base: "inherit", lg: "none"}}
                        icon={<HiMenu/>} aria-label={d("toggleMenu")} isRound={true}
            />
            <Box as={Link} href={`/${lang}`} className="_icon-logo" aria-label={d("homePage")}
                 sx={{transition: 'all 0.3s ease 0s;'}} _hover={{textDecoration: 'none'}} fontSize={[28, 36, 48, 56]}
            />
            <Flex justifyContent='center' alignItems='center' gap={[1, 2, 3, 4]}>
              <Flex as={'a'} display={{base: 'none', lg: 'flex'}} fontSize={[15, 20, 25, 30]}
                    href="tel:+380933375372">
                (093)33-75-372
              </Flex>

              <IconButton as={'a'} className="link _icon-viber" aria-label={d("viberIcon")} isRound={true}
                          href="viber://add?number=380933375372" minW={[1, 2]} fontSize={[20, 25, 30, 35]}
                          display={{base: "none", sm: "inherit"}}/>
              <IconButton icon={<ThemeIcon/>} aria-label={d("themeIcon")} fontSize={[20, 25, 30, 35]} isRound={true}
                          onClick={toggleColorMode} minW={[1, 2]}/>
              <LocaleSwitcher/>
              <Box display={['none', 'block']}><FavoriteProductsIcon/></Box>
              <ShoppingCartButton totalData={getCartProductsCount(cartProducts)} isOpen={isOpen} onToggle={onToggle}
                                  onClose={onClose}>
                <Cart cartProducts={cartProducts}/>
              </ShoppingCartButton>
              <UserMenuButton/>
            </Flex>
          </Flex>
          <Flex as='nav' px={2} display={{base: "none", lg: "inherit"}} backgroundColor='bodyColor'
                boxShadow={'base'}>
            <Navbar tagsUrl={tagsUrl} brandsItems={brandsItems} isMobile={false} onClose={onMenuClose}/>
          </Flex>
        </Flex>
      </Flex>
    </StickNav>
  );
};

export default Header;