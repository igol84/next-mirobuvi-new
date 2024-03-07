import {Prisma, OrderStatus} from "@prisma/client";
import {OrderFormSchema, ProductDetailsByUrl} from "@/app/[lang]/make-order/types";
import {prisma} from "@/lib/db/prisma";
import {ShoppingCart} from "@/lib/db/cart";
import {OrderEditFormSchema} from "@/app/[lang]/admin/orders/[orderId]/types";

export type OrderStatusType = OrderStatus

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { orderItems: true }
}>

type CreateOrderType = {
  (cart: ShoppingCart, orderFormData: OrderFormSchema, productNamesByUrl: ProductDetailsByUrl): Promise<OrderWithItems>
}

export const createOrder: CreateOrderType = async (cart, orderFormData, productDetailsByUrl) => {
  const nextOrderNumber = await prisma.order.aggregate({
    _max: {orderNumber: true}
  }).then(data => data._max.orderNumber).then(number => number ? number + 1 : 1)
  return await prisma.order.create({
    data: {
      orderNumber: nextOrderNumber,
      firstName: orderFormData.firstName,
      lastName: orderFormData.lastName,
      delivery: orderFormData.delivery,
      email: orderFormData.email,
      phone: orderFormData.phone,
      userId: cart.userId,
      orderItems: {
        createMany: {
          data: cart.items.map(item => {
            const productNameEn = productDetailsByUrl.get(item.productId)?.en
            const productNameUa = productDetailsByUrl.get(item.productId)?.ua
            const price = productDetailsByUrl.get(item.productId)?.price
            return {
              productId: item.productId,
              productNameEn: productNameEn ? productNameEn : '',
              productNameUa: productNameUa ? productNameUa : '',
              size: item.size,
              quantity: item.quantity,
              price: price ? price : 0
            }
          })
        }
      }
    },
    include: {orderItems: true}
  })
}

export const editOrder = async (order: OrderEditFormSchema) => {
  await prisma.order.update({
    where: {id: order.id},
    data: {
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      phone: order.phone,
      delivery: order.delivery
    }
  })
}

export const deleteOrder = async (orderId: string) => {
  await prisma.order.delete({
    where: {
      id: orderId
    }
  })
}

export const getUserOrders = async (userId: string): Promise<OrderWithItems[] | null> => {
  const user = await prisma.user.findUnique({
    where: {id: userId},
    include: {orders: {include: {orderItems: true}, orderBy: {createdAt: 'desc'}}}
  })
  if (!user) return null
  return user.orders
}

export const getOrder = async (orderId: string): Promise<OrderWithItems | null> => {
  try {
    const order = await prisma.order.findUnique({
      where: {id: orderId},
      include: {orderItems: true}
    })
    if (!order) return null
    return order
  } catch {
    return null
  }
}
export const getTotalOrderCount = async (): Promise<number> => {
  return await prisma.order.count();
}
export const getOrders = async (currentPage: number, pageSize: number): Promise<OrderWithItems[] | null> => {
  try {
    const order = await prisma.order.findMany({
      include: {orderItems: true},
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: {createdAt: 'desc'}
    })
    if (!order) return null
    return order
  } catch {
    return null
  }
}

export const editItemQuantity = async (productId: string, quantity: number) => {
  try {
    await prisma.orderItem.update({
      where: {id: productId},
      data: {quantity}
    })
    return 'success'
  } catch {
    return 'serverError'
  }
}

export const deleteItem = async (productId: string) => {
  try {
    await prisma.orderItem.delete({
      where: {id: productId}
    })
    return 'success'
  } catch {
    return 'serverError'
  }
}

export const moveItemToAnotherOrder = async (productId: string, orderId: string) => {
  try {
    await prisma.order.update({
      where: {id: orderId},
      data: {
        orderItems: {
          connect: {
            id: productId
          }
        }
      }
    })
    return 'success'
  } catch {
    return 'serverError'
  }
}

export const changeOrderStatus = async (orderId: string, newStatus: OrderStatusType) => {
  try {
    await prisma.order.update({
      where: {id: orderId},
      data: {
        status: newStatus
      }
    })
    return 'success'
  } catch {
    return 'serverError'
  }
}