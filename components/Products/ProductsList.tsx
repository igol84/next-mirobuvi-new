'use client'
import React, {useContext} from 'react';
import {Box, Center, Flex, Heading, IconButton, Link, Text, Wrap, WrapItem} from "@chakra-ui/react";
import Product from "@/components/Products/Product";
import {ProductType} from "@/components/Products/types";
import PaginationBar, {PaginationBarProps} from "@/components/base/PaginationBar";
import {BrandProps} from "@/components/Brands/types";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {AddIcon} from "@chakra-ui/icons";
import NextLink from "next/link";
import {IsAdminContext} from "@/app/providers";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";

interface Props {
  products: ProductType[],
  brandData?: BrandProps,
  paginationBar?: PaginationBarProps,
}

const ProductsList = ({products, brandData, paginationBar}: Props) => {
  const isAdmin = useContext(IsAdminContext)
  const t = useTranslations('home')
  const locale = useLocale() as Locale
  const brandUrl = brandData?.url
  return (
    <>
      {isAdmin && brandUrl !== undefined && (
        <Box pb={2}>
          <Link as={NextLink} href={`/${locale}/brands/${brandUrl}/add`} _hover={{color: 'hoverLinkTextColor'}}>
            <IconButton aria-label={'addBrand'} icon={<AddIcon/>}/>
          </Link>
        </Box>
      )}
      {products.length === 0
        ? <Heading>{t('notFound')}</Heading>
        : (
          <Flex flexDirection='column' gap={4} pb={{base: 4, sm: 0}}>
            <Wrap justify={{base: 'center', lg: 'flex-start'}} spacing={[0, 0, 0, 1, 0]}>
              {!!brandData && (
                <WrapItem flexDirection="column" p={[1, 1, 1, 0, 1]}>
                  <ChakraNextImage
                    as={NextImage} borderRadius={[30, 15]} width={249} height={249} alt={`brand ${brandData.brandName}`}
                    src={brandData.imgUrl} priority={true}
                  />
                  <Center width={249}><Text fontSize='2rem' fontWeight='bold'>{brandData.brandName}</Text></Center>
                </WrapItem>
              )}
              {products.map(product => {
                return (
                  <WrapItem key={product.id}>
                    <article>
                      <Product product={product}/>
                    </article>
                  </WrapItem>
                )
              })}
            </Wrap>

            {paginationBar && (
              <Flex w='full' justifyContent='center'>
                <PaginationBar currentPage={paginationBar.currentPage} totalPages={paginationBar.totalPages}/>
              </Flex>
            )}
          </Flex>
        )}
    </>
  )
    ;
};

export default ProductsList;