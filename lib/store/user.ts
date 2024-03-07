import {User} from "@/lib/store/types";
import {User as userDB} from "@/lib/db/user";
import {StateCreator} from "zustand";

type State = {
  user: User | undefined
}

type Actions = {
  setUser: (user: User | undefined) => void,
  pushFavoriteProduct: (favoriteProduct: string) => void,
  putFavoriteProduct: (favoriteProduct: string) => void
}

export type UserSlice = State & Actions

export const createUserSlice: StateCreator<
  UserSlice,
  [],
  [],
  UserSlice
> = ((set) => ({
  user: undefined,
  setUser: (user) => {
    set({user})
  },

  pushFavoriteProduct: (favoriteProduct) => {
    set(state => {
      let user: User | undefined = undefined
      if(state.user) {
        user = {...state.user, favoriteProducts: state.user.favoriteProducts.add(favoriteProduct)}
      }
      return {user}
    })
  },

  putFavoriteProduct: (favoriteProduct) => {
    set(state => {
      let user: User | undefined = undefined
      if(state.user) {
        const userFavoriteProducts = state.user.favoriteProducts
        userFavoriteProducts.delete(favoriteProduct)
        user = {...state.user, favoriteProducts: userFavoriteProducts}
      }
      return {user}
    })
  }

}))

export const userConvertFromDB = (user: userDB): User => {
  return {id: user.id, name: user.name, image: user.image, favoriteProducts: new Set(user.favoriteProducts)}
}