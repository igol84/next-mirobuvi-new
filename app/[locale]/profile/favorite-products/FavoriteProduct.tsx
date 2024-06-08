import React, {useState} from 'react';
import {Box, IconButton} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {productCardFactory} from "@/components/Products/ProductCardFactory";
import {serverActionPutProductLike} from "@/app/[locale]/profile/favorite-products/actions";
import {ProductType} from "@/components/Products/types";
import {useTranslations} from "next-intl";


interface Props {
  product: ProductType
  userId: number
}

const FavoriteProduct = ({product, userId}: Props) => {
  const t = useTranslations('favoriteList')
  const [loading, setLoading] = useState(false)
  const onClickDelete = async (productUrl: string) => {
    setLoading(true)
    await serverActionPutProductLike(userId, productUrl)
  }
  const ProductComponent = productCardFactory(product)
  const onClick = () => onClickDelete(product.url)
  return (
    <Box position='relative'>
      <IconButton icon={<SmallCloseIcon/>} position='absolute' _hover={{bgColor: 'red'}} right={3} top={3} size='xs'
                  zIndex={99999} variant='solid' isLoading={loading} aria-label={t('buttonLabel')} onClick={onClick}/>
      {ProductComponent}
    </Box>
  );
};

export default FavoriteProduct;