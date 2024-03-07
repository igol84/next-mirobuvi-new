import React from 'react';
import {Flex, Tooltip} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {serverActionPushProductLike, serverActionPutProductLike} from "@/components/product/actions";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {useStore} from "@/lib/store";


interface Props {
  productUrl: string
}

const Like = ({productUrl}: Props) => {
  const [user, pushFavoriteProduct, putFavoriteProduct] = useStore(
    (state) => [state.user, state.pushFavoriteProduct, state.putFavoriteProduct]
  )
  const isFavorite = user ? user.favoriteProducts.has(productUrl) : false
  const d = useDictionaryTranslate("favorite")
  const isAuth = !!user
  const label = isAuth ? isFavorite ? d('inFan') : d('fan') : d('loginIn')

  const color = isFavorite ? 'secondary' : 'primary'
  const onLikeClick = !isAuth
    ? () => undefined
    : isFavorite
      ? async () => {
        putFavoriteProduct(productUrl)
        await serverActionPutProductLike(user.id, productUrl)
      }
      : async () => {
        pushFavoriteProduct(productUrl)
        await serverActionPushProductLike(user.id, productUrl)
      }
  return (
    <Tooltip hasArrow label={label}>
      <Flex gap={4} alignItems='center' color={color} _hover={{cursor: 'pointer', color: 'secondary'}}
            onClick={onLikeClick}>
        <Icon as={isFavorite ? FaHeart : FaRegHeart} boxSize={16}/>
      </Flex>
    </Tooltip>
  );
};

export default Like;