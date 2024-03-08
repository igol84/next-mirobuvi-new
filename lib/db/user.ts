import {Prisma} from "@prisma/client";
import {prisma} from "@/lib/db/prisma";


export type UserWithOrders = Prisma.UserGetPayload<{
  include: { orders: { include: { orderItems: true } } }
}>
export type User = Prisma.UserGetPayload<{}>

export const getUser = async (userId: number): Promise<User | null> => {
  try {
    let user = await prisma.user.findUnique({
      where: {id: userId}
    })
    if (!user) return null
    return user
  } catch {
    return null
  }
}

export const getUserWithOrders = async (userId: number): Promise<UserWithOrders | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {id: userId},
      include: {orders: {include: {orderItems: true}, orderBy: {createdAt: 'desc'}}}
    })
    if (!user) return null
    return user
  } catch {
    return null
  }
}

export const pushFavoriteProduct = async (userId: number, productUrl: string): Promise<null | string[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: {id: userId},
      include: {orders: {include: {orderItems: true}, orderBy: {createdAt: 'desc'}}}
    })
    if (!user) return null
    const userFavoriteProducts = user.favoriteProducts !== ''
      ? new Set(user.favoriteProducts.split('|'))
      : new Set([])
    userFavoriteProducts.add(productUrl)
    await prisma.user.update({
      where: {id: userId},
      data: {
        favoriteProducts: Array.from(userFavoriteProducts).join('|')
      }
    })
    return Array.from(userFavoriteProducts)
  } catch {
    return null
  }
}

export const putFavoriteProduct = async (userId: number, productUrl: string): Promise<null | string[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: {id: userId},
      include: {orders: {include: {orderItems: true}, orderBy: {createdAt: 'desc'}}}
    })
    if (!user) return null
    const userFavoriteProducts = new Set(user.favoriteProducts.split('|'))
    userFavoriteProducts.delete(productUrl)

    await prisma.user.update({
      where: {id: userId},
      data: {
        favoriteProducts: Array.from(userFavoriteProducts).join('|')
      }
    })
    return Array.from(userFavoriteProducts)
  } catch {
    return null
  }
}