import React, {useContext, useState} from 'react';
import {Box, Center, Flex, IconButton, Link} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {BrandCardPropsWithFirstAdmin} from "@/components/Brands/types";
import {EditIcon} from "@chakra-ui/icons";
import {IsAdminContext} from "@/app/providers";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";

const BrandCard = ({brandId, brandName, url, isFirst, imgUrl}: BrandCardPropsWithFirstAdmin) => {
  const t = useTranslations('brandsAdmin')
  const locale = useLocale() as Locale

  const isAdmin = useContext(IsAdminContext)

  const [hovered, setHovered] = useState(false)
  const onMouseEnter = () => setHovered(true)
  const onMouseLeave = () => setHovered(false)

  return (
    <Flex flexDirection='column' alignItems='center' gap={4} position='relative' onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
      {isAdmin && (
        <Box position='absolute' top={2} right={2} hidden={!hovered}>
          <Link as={NextLink} href={`/${locale}/brands/edit/${brandId}`} _hover={{color: 'hoverLinkTextColor'}}>
            <IconButton aria-label={t('editBrand')} icon={<EditIcon/>}/>
          </Link>
        </Box>
      )}
      <Link as={NextLink} href={`/${locale}/brands/${url}`} _hover={{color: 'hoverLinkTextColor'}}>
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