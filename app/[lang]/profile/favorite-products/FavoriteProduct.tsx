import React, {useState} from 'react';
import {Box, IconButton} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";
import {productCardFactory} from "@/components/Products/ProductCardFactory";
import {serverActionPutProductLike} from "@/app/[lang]/profile/favorite-products/actions";
import {ProductType} from "@/components/Products/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";


interface Props {
  product: ProductType
  userId: string
}

const FavoriteProduct = ({product, userId}: Props) => {
  const d = useDictionaryTranslate("favoriteList")
  const [loading, setLoading] = useState(false)
  const onClickDelete = async (productUrl: string) => {
    setLoading(true)
    await serverActionPutProductLike(userId, productUrl)
  }
  const ProductComponent = productCardFactory(product)
  const onClick = () => onClickDelete(product.url)
  return (
    <Box position='relative'>
      <IconButton icon={<SmallCloseIcon/>} position='absolute' _hover={{bgColor: 'red'}} right={3} top={3}
                  size='xs' variant='solid' isLoading={loading} aria-label={d('buttonLabel')} onClick={onClick}/>
      {ProductComponent}
    </Box>
  );
};

export default FavoriteProduct;