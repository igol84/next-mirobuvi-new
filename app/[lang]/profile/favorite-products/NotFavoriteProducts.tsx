'use client'
import React from 'react';
import {Heading} from "@chakra-ui/react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const NotFavoriteProducts = () => {
  const d = useDictionaryTranslate("favoriteList")
  return (
    <Heading>{d('NoFavoriteProducts')}</Heading>
  );
};

export default NotFavoriteProducts