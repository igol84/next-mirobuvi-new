'use client'
import React from 'react';
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {Heading} from "@chakra-ui/react";

const UserNotFound = () => {
  const d = useDictionaryTranslate("orderList")
  return (
    <Heading>{d('userNotFound')}</Heading>
  )
}

export default UserNotFound