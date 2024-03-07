import React, {useContext} from 'react';
import {Box, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {IOrderItem} from "@/app/[lang]/admin/orders/types";

interface Props {
  item: IOrderItem
}

const Product = ({item}: Props) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("orderList")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const productName = lang === 'en' ? item.productNameEn : item.productNameUa
  const size = item.size ? ' ' + item.size : ''
  return (
    <Box>
      <Link as={NextLink} href={`/${lang}/products/${item.url}`} display='flex' alignItems='center'
            _hover={{color: 'hoverLinkTextColor'}}
      >
        <ChakraNextImage
          as={NextImage} src={`https://mirobuvi.com.ua/ftp_products/${item.imgUrl}/02.jpg`}
          alt={'image'} width={49} height={49} sizes="100vw" borderRadius={[30, 15]}
        />
        {productName}
        {size} — {UAHFormat.format(item.price)}{d('pricePrefix')} {item.quantity}{d('PC')}
      </Link>
    </Box>
  );
};

export default Product;