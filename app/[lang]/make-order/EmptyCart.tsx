'use client'
import React from 'react';
import {Box, Heading} from "@chakra-ui/react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const EmptyCart = () => {
  const d = useDictionaryTranslate("cart")
  return (
    <Box>
      <Heading>{d('emptyCart')}</Heading>
    </Box>
  );
};

export default EmptyCart;