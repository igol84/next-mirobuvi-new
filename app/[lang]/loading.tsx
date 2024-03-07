'use client'
import {Flex, Skeleton, SkeletonText} from "@chakra-ui/react";
import React from "react";
import _ from "lodash";


export default function LoadingBrands() {
  return (
    <>
      <Skeleton width={{base: '290px', md: '320px'}} borderRadius={8} height={8} mb={2}/>
      <Flex gap={'100px 16px'} wrap='wrap' alignContent='space-between'>
        {_.range(12).map(index => (
          <Flex key={index} gap={2} direction='column'>
            <Skeleton borderRadius={16} width='250px' height='250px'/>
            <SkeletonText/>
          </Flex>
        ))}
      </Flex>
    </>
  )
}