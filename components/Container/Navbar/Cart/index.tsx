import React from 'react';
import {Box, Flex, Image, useColorMode} from "@chakra-ui/react";
import {ProductCart} from "@/lib/cartFunctions";
import CartItem from "@/components/Container/Navbar/Cart/CartItem";
import {useDictionaryTranslate} from "@/dictionaries/hooks";


interface Props {
  cartProducts: ProductCart[]
}

const Cart = ({cartProducts}: Props) => {
  const d = useDictionaryTranslate("cart")
  const {colorMode} = useColorMode()
  const isEmpty = cartProducts.length === 0
  return (
    <Box>
      {isEmpty && (
        <Image src={colorMode === 'dark' ? '/images/empty-cart-dark.png' : '/images/empty-cart.png'}
               alt={d('emptyCartImg')}/>
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