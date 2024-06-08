'use client'
import React from 'react';
import {Heading} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

const UserNotFound = () => {
  const t = useTranslations('orderList')
  return (
    <Heading>{t('userNotFound')}</Heading>
  )
}

export default UserNotFound