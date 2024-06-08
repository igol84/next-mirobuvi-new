import React from 'react';
import {Box, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {IOrderItem} from "@/app/[locale]/admin/orders/types";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n";

interface Props {
  item: IOrderItem
}

const Product = ({item}: Props) => {
  const t = useTranslations('orderList')
  const locale = useLocale() as Locale
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const productName = locale === 'en' ? item.productNameEn : item.productNameUa
  const size = item.size ? ' ' + item.size : ''
  return (
    <Box>
      <Link as={NextLink} href={`/${locale}/products/${item.url}`} display='flex' alignItems='center'
            _hover={{color: 'hoverLinkTextColor'}}
      >
        <ChakraNextImage
          as={NextImage} src={item.imgUrl}
          alt={'image'} width={49} height={49} sizes="100vw" borderRadius={[30, 15]}
        />
        {productName}
        {size} — {UAHFormat.format(item.price)}{t('pricePrefix')} {item.quantity}{t('PC')}
      </Link>
    </Box>
  );
};

export default Product;