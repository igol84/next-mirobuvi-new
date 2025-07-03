import React from 'react';
import {Flex, IconButton, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {IOrderItem} from "@/app/[locale]/admin/orders/types";
import {RiDraggable} from "react-icons/ri";
import {useDraggable} from "@dnd-kit/core";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";

interface Props {
  item: IOrderItem
}

const Product = ({item}: Props) => {
  const t = useTranslations('orderList')
  const locale = useLocale() as Locale
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const productName = locale === 'en' ? item.productNameEn : item.productNameUa
  const size = item.size ? ' ' + item.size : ''
  const {attributes, listeners, setNodeRef, setActivatorNodeRef, transform} = useDraggable({
    id: item.id,
  })
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined
  return (
    <Flex ref={setNodeRef} layerStyle='adminOrderProduct' style={style}>
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
      <IconButton size='lg' aria-label='Draggable' icon={<RiDraggable/>} {...listeners} {...attributes}
                  variant='unstyled' ref={setActivatorNodeRef}/>
    </Flex>
  );
};

export default Product;