'use client'
import {Flex, Skeleton} from "@chakra-ui/react";
import React from "react";
import _ from "lodash";


export default function LoadingBrands() {
  return (
    <Flex direction='column' gap={2}>
      {_.range(12).map(index => (
        <Skeleton key={index} width='full' borderRadius={8} height={16} mb={2}/>
      ))}
    </Flex>
  )
}