import React, {useContext, useState} from 'react';
import {Box, Center, Flex, IconButton, Link} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {LangContext} from "@/locale/LangProvider";
import {BrandCardPropsWithFirstAdmin} from "@/components/Brands/types";
import {EditIcon} from "@chakra-ui/icons";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const BrandCard = ({brandName, url, isFirst, imgUrl, isAdmin}: BrandCardPropsWithFirstAdmin) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("brandsAdmin")
  const dict = {
    'editBrand': d('editBrand'),
  }
  const [hovered, setHovered] = useState(false)
  const onMouseEnter = () => setHovered(true)
  const onMouseLeave = () => setHovered(false)
  return (
    <Flex flexDirection='column' alignItems='center' gap={4} position='relative' onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
      {isAdmin && (
        <Box position='absolute' top={2} right={2} hidden={!hovered}>
          <IconButton aria-label={dict.editBrand} icon={<EditIcon/>} onClick={() => {
            console.log('edit')
          }}/>
        </Box>
      )}
      <Link as={NextLink} href={`/${lang}/brands/${url}`} _hover={{color: 'hoverLinkTextColor'}}>
        <Box borderRadius={50} borderColor={'black'}>
          <ChakraNextImage
            as={NextImage} priority={isFirst} src={imgUrl} shadow='base' borderRadius={[30, 15]}
            width={249} height={249} alt={`photo ${brandName}`}
          />
        </Box>
        <Center>{brandName}</Center>
      </Link>
    </Flex>
  );
};

export default BrandCard;