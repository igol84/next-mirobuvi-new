'use client'
import React from 'react';
import {Box, Heading} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

const EmptyCart = () => {
  const t = useTranslations('cart')
  return (
    <Box>
      <Heading>{t('emptyCart')}</Heading>
    </Box>
  );
};

export default EmptyCart;