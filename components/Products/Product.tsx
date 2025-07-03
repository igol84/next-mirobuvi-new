import React, {useContext, useState} from 'react';
import {Box, IconButton, Link} from "@chakra-ui/react";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {productCardFactory} from "@/components/Products/ProductCardFactory";
import {ProductType} from "@/components/Products/types";
import NewIcon from "@/components/Products/NewIcon";
import {useFavorite} from "@/components/Products/favorirwHooks";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import {EditIcon} from "@chakra-ui/icons";
import {IsAdminContext} from "@/app/providers";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";

const FavoriteIcon = dynamic(() => import('@/components/Products/FavoriteIcon'), {ssr: false})


interface Props {
  product: ProductType
}

const Product = ({product}: Props) => {
  const isAdmin = useContext(IsAdminContext)
  const t = useTranslations('productAdmin')
  const locale = useLocale() as Locale
  const [isHover, setIsHover] = useState(false)
  const ProductComponent = productCardFactory(product)
  const {isFavorite, favoriteHidden, onClick} = useFavorite(product.url, isHover)
  const favoriteIcon = isFavorite ? <FaHeart/> : <FaRegHeart/>
  return (
    <Box sx={{transitionDuration: '0.2s', transitionTimingFunction: "ease-in-out"}} p={[1, 1, 1, 0, 1]} h='full'
         position='relative' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
         borderRadius={15} shadow={isHover ? '2xl' : 'none'} _dark={{shadow: isHover ? 'dark-lg' : 'none'}}>
      {isAdmin
        ? (
          <Box position='absolute' top={2} right={2} hidden={!isHover} zIndex={99999}>
            <Link as={NextLink} href={`/${locale}/products/${product.url}/edit`} _hover={{color: 'hoverLinkTextColor'}}>
              <IconButton aria-label={t('editProduct')} icon={<EditIcon/>}/>
            </Link>
          </Box>
        )
        : <FavoriteIcon icon={favoriteIcon} onClick={onClick} hidden={favoriteHidden}/>
      }
      <NewIcon hidden={!product.isNew}/>
      {ProductComponent}
    </Box>
  )
}

export default Product