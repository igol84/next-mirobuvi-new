import {useStore} from "@/lib/store";
import {serverActionPushProductLike, serverActionPutProductLike} from "@/components/Products/actions";

interface UseFavorite {
  (
    productUrl: string,
    isHover: boolean,
  ): {
    favoriteHidden: boolean
    onClick: (() => void) | (() => Promise<void>)
    isFavorite: boolean
  }
}

export const useFavorite: UseFavorite = (productUrl: string, isHover: boolean) => {
  const [user, pushFavoriteProduct, putFavoriteProduct] = useStore(
    state => [state.user, state.pushFavoriteProduct, state.putFavoriteProduct]
  )
  const isAuth = !!user
  const isFavorite = user ? user.favoriteProducts.has(productUrl) : false
  const favoriteHidden = (!isFavorite && !isHover) || !isAuth

  const onClickNotAuthorizedUser = () => undefined
  const onClickOnFavorite = async (userId: string, productUrl: string) => {
    putFavoriteProduct(productUrl)
    await serverActionPutProductLike(userId, productUrl)
  }
  const onClickOnNotFavorite = async (userId: string, productUrl: string) => {
    pushFavoriteProduct(productUrl)
    await serverActionPushProductLike(userId, productUrl)
  }
  const onClick = !isAuth
    ? onClickNotAuthorizedUser
    : isFavorite
      ? () => onClickOnFavorite(user.id, productUrl)
      : () => onClickOnNotFavorite(user.id, productUrl)
  return {isFavorite, favoriteHidden, onClick}
}