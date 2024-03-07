import React, {useContext} from 'react';
import {Box, Center, Flex, Link} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {LangContext} from "@/locale/LangProvider";
import {BrandCardPropsWithFirst} from "@/components/Brands/types";

const BrandCard = ({brandId, brandName, url, isFirst}: BrandCardPropsWithFirst) => {
  const lang = useContext(LangContext)
  return (
    <Flex flexDirection='column' alignItems='center' gap={4}>
      <Link as={NextLink} href={`/${lang}/brands/${url}`} _hover={{color: 'hoverLinkTextColor'}}>
        <Box borderRadius={50} borderColor={'black'}>
          <ChakraNextImage priority={isFirst}
            shadow='base' borderRadius={[30, 15]} as={NextImage}
            width={249} height={249} alt={`photo ${brandName}`}
            src={`https://mirobuvi.com.ua/ftp_brands/${brandId}.jpg`}
          />
        </Box>
        <Center>{brandName}</Center>
      </Link>
    </Flex>
  );
};

export default BrandCard;