import React from 'react';
import {Box, Flex, Image, useColorMode} from "@chakra-ui/react";
import {ProductCart} from "@/lib/server/cart/cartFunctions";
import CartItem from "@/components/Container/Navbar/Cart/CartItem";
import {useTranslations} from "next-intl";


interface Props {
  cartProducts: ProductCart[]
}

const Cart = ({cartProducts}: Props) => {
  const t = useTranslations('cart')
  const {colorMode} = useColorMode()
  const isEmpty = cartProducts.length === 0
  return (
    <Box>
      {isEmpty && (
        <Image src={colorMode === 'dark' ? '/images/empty-cart-dark.png' : '/images/empty-cart.png'}
               alt={t('emptyCartImg')}/>
      )}
      <Flex flexDirection={'column'} gap={2} p={'8px 0'}>
        {cartProducts.map((cartItem, index) => (
          <CartItem key={index} cartItem={cartItem}/>
        ))}
      </Flex>
    </Box>
  );
};

export default Cart;