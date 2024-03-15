'use client'
import React, {ReactNode, useEffect} from 'react';
import {Flex, useDisclosure} from "@chakra-ui/react";
import DrawerMenu from "@/components/Container/Navbar/NavbarDrawer";
import {BrandSchema} from "@/schemas/data";
import {Item} from "@/components/Container/Navbar/types";
import {ProductCart} from "@/lib/cartFunctions";
import Header from "@/components/Container/Header";
import Footer from "@/components/Container/Footer";
import {User} from "@/lib/store/types";
import {useStore} from "@/lib/store";
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import './styles.scss';
import {TagUrl} from "@/app/[lang]/[urlTag]/types";

type Props = {
  children: ReactNode
  brands: BrandSchema[]
  cartProducts: ProductCart[]
  user: User | null
  tagsUrl: TagUrl[]
}

const Container = ({children, brands, cartProducts, user, tagsUrl}: Props) => {
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const brandsItems: Item[] = brands.map(brand => (
    {title: brand.name, url: brand.url}
  ))

  const setUser = useStore(
    state => state.setUser
  )

  useEffect(() => {
    if (user)
      setUser(user)
  }, [setUser, user]);

  return (
    <Flex direction='column' minH='100%' mx={[2, 4, 8, 16, 24]}>
      <Header onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} cartProducts={cartProducts}
              brandsItems={brandsItems} tagsUrl={tagsUrl}/>
      <Flex direction='column' flex={1} backgroundColor='bodyColor' p={[1, 4, 8, 16]} roundedBottom={6}>
        <Flex as='main' flex={1} direction='column'>
          {children}
        </Flex>
      </Flex>
      <Footer isAuthorized={!!user}/>
      <DrawerMenu brandsItems={brandsItems} isOpen={isMenuOpen} onClose={onMenuClose} tagsUrl={tagsUrl}/>
    </Flex>
  );
};

export default Container;