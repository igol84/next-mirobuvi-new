'use client'
import React from 'react';
import {Heading} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

const NotFavoriteProducts = () => {
  const t = useTranslations('favoriteList')
  return (
    <Heading>{t('NoFavoriteProducts')}</Heading>
  );
};

export default NotFavoriteProducts