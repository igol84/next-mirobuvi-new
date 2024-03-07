'use client'
import {Flex, Skeleton, SkeletonText} from "@chakra-ui/react";
import React from "react";
import _ from "lodash";


export default function LoadingBrands() {
  return (
    <>
      <Skeleton width={{base: '290px', md: '320px'}} borderRadius={2} height={4} mb={2}/>
      <Flex gap={2} direction={{base: 'column', md: 'row'}}>
        <Flex gap={2}>
          <Flex gap={2} direction='column'>
            {_.range(3).map(index => (
              <Skeleton key={index} borderRadius={2} width={['60px', '83px']} height={['60px', '83px']}/>
            ))}
          </Flex>
          <Skeleton borderRadius={2} width={['240px', '440px', '640px']} height={['240px', '440px', '640px']}/>
        </Flex>
        <Flex gap={4} width='full' direction='column'>
          {_.range(8).map(index => (
            <SkeletonText key={index} width='full'/>
          ))}
        </Flex>
      </Flex>
    </>
  )
}