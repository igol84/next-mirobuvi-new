import {prisma} from "@/lib/db/prisma";
import {cookies} from "next/headers";
import {Cart, CartItem, Prisma} from "@prisma/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: true }
}>;

export type ShoppingCart = CartWithProducts & {
  cartSize: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOptions)
  let cart: CartWithProducts | null

  if (session) {
    cart = await prisma.cart.findFirst({
      where: {userId: session.user.id},
      include: {items: true},
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
        where: {id: localCartId},
        include: {items: true},
      })
      : null;
  }

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    cartSize: cart.items.reduce((acc, item) => acc + item.quantity, 0)
  }

}

export async function createCart(): Promise<ShoppingCart> {
  const session = await getServerSession(authOptions)
  let newCart: Cart;
  if (session) {
    newCart = await prisma.cart.create({
      data: {userId: session.user.id},
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    cookies().set("localCartId", newCart.id);
  }

  return {
    ...newCart,
    items: [],
    cartSize: 0,
  };
}

export async function margeAnonymousCartIntoUserCart(userId: string) {
  const localCartId = cookies().get("localCartId")?.value;
  const localCart = localCartId
    ? await prisma.cart.findUnique({
      where: {id: localCartId},
      include: {items: true},
    })
    : null;
  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: {userId},
    include: {items: true},
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = margeCartItems(localCart.items, userCart.items);
      await tx.cartItem.deleteMany({
        where: {cartId: userCart.id},
      });

      await tx.cart.update({
        where: {id: userCart.id},
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size
              })),
            },
          },
        },
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size
              })),
            },
          },
        },
      });
    }
    await tx.cart.delete({
      where: {id: localCart.id},
    });

    cookies().set("localCartId", "");
  });
}

function margeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}

export async function deleteCart(cartId: string) {
  await prisma.cart.delete({
    where: {id: cartId}
  })
}

export async function clearOldCart() {
  const date = new Date()
  date.setMonth(date.getMonth() - 3);
  const deletedCarts = await prisma.cart.findMany({
    where: {
      updatedAt: {
        lte: date
      }
    }
  })
  await prisma.cart.deleteMany({
    where: {
      updatedAt: {
        lte: date
      }
    }
  })
  return deletedCarts
}