"use server"

import {createCart, getCart} from "@/lib/db/cart";
import {prisma} from "@/lib/db/prisma";
import {revalidatePath} from "next/cache";

export async function incrementProductQuantity(productId: string, size?: number | null) {
  const cart = await getCart() ?? (await createCart())
  const articleInCart = cart.items.find(item => item.productId === productId && item.size === size)
  if (articleInCart) {
    await prisma.cart.update({
      where: {id: cart.id},
      data: {
        items: {
          update: {
            where: {id: articleInCart.id},
            data: {quantity: {increment: 1}},
          },
        },
      },
    })
  } else {
    await prisma.cart.update({
      where: {id: cart.id},
      data: {
        items: {
          create: {
            size: size ? size : 0,
            productId,
            quantity: 1
          },
        },
      },
    });
  }
  revalidatePath("/")
}

export async function decrementProductQuantity(productId: string, size?: number | null) {
  const cart = await getCart() ?? (await createCart())
  const articleInCart = cart.items.find(item => item.productId === productId && item.size === size)
  if (articleInCart) {
    if (articleInCart.quantity > 1)
      await prisma.cart.update({
        where: {id: cart.id},
        data: {
          items: {
            update: {
              where: {id: articleInCart.id},
              data: {quantity: {decrement: 1}},
            },
          },
        },
      })
    else
      await prisma.cart.update({
        where: {id: cart.id},
        data: {
          items: {
            delete: {id: articleInCart.id},
          },
        },
      })
  }
  revalidatePath("/")
}

export async function deleteProductQuantity(productId: string, size?: number | null) {
  const cart = await getCart() ?? (await createCart())
  const articleInCart = cart.items.find(item => item.productId === productId && item.size === size)
  if (articleInCart) {
    await prisma.cart.update({
      where: {id: cart.id},
      data: {
        items: {
          delete: {id: articleInCart.id},
        },
      },
    });
  }
  revalidatePath("/")
}
