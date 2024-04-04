import React, {useContext} from 'react';
import {Box, Center, Flex, Link} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {LangContext} from "@/locale/LangProvider";
import {BrandCardPropsWithFirstAdmin} from "@/components/Brands/types";

const BrandCard = ({brandName, url, isFirst, imgUrl, isAdmin}: BrandCardPropsWithFirstAdmin) => {
  const lang = useContext(LangContext)
  const adminText = isAdmin ? 'admin' : ''
  return (
    <Flex flexDirection='column' alignItems='center' gap={4}>
      <Link as={NextLink} href={`/${lang}/brands/${url}`} _hover={{color: 'hoverLinkTextColor'}}>
        <Box borderRadius={50} borderColor={'black'}>
          <ChakraNextImage
            as={NextImage} priority={isFirst} src={imgUrl} shadow='base' borderRadius={[30, 15]}
            width={249} height={249} alt={`photo ${brandName}`}
          />
        </Box>
        <Center>{brandName} {adminText}</Center>
      </Link>
    </Flex>
  );
};

export default BrandCard;