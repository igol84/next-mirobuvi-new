import {Prisma} from "@prisma/client";
import {prisma} from "@/lib/db/prisma";

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { orderItems: true }
}>

export type OrderCreateInput = Omit<Prisma.OrderCreateInput, 'orderNumber'> & { userId: number | null }
export type OrderFormData = Pick<
  Prisma.OrderGetPayload<{}>, 'id' | 'firstName' | 'lastName' | 'email' | 'phone' | 'delivery'
>
export type OrderItemCreateInput = Omit<Prisma.OrderItemCreateInput, 'order'>

export type OrderStatusType = "New" | "InProgress" | "Done" | "NotDone"
type CreateOrderType = {
  (orderCreateInput: OrderCreateInput): Promise<OrderWithItems | null>
}

export const createOrder: CreateOrderType = async (orderCreateInput: OrderCreateInput) => {
  await prisma.$transaction(async (tx) => {
    const nextOrderNumber = await tx.order.aggregate({
      _max: {orderNumber: true}
    }).then(data => data._max.orderNumber).then(number => number ? number + 1 : 1)
    return await tx.order.create({
      data: {
        orderNumber: nextOrderNumber,
        firstName: orderCreateInput.firstName,
        lastName: orderCreateInput.lastName,
        delivery: orderCreateInput.delivery,
        email: orderCreateInput.email,
        phone: orderCreateInput.phone,
        userId: orderCreateInput.userId,
        status: orderCreateInput.status,
        orderItems: orderCreateInput.orderItems
      },
      include: {orderItems: true}
    })
  })
  return null
}

export const editOrder = async (order: OrderFormData) => {
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

export const deleteOrder = async (orderId: number) => {
  await prisma.order.delete({
    where: {
      id: orderId
    }
  })
}

export const getUserOrders = async (userId: number): Promise<OrderWithItems[] | null> => {
  const user = await prisma.user.findUnique({
    where: {id: userId},
    include: {orders: {include: {orderItems: true}, orderBy: {createdAt: 'desc'}}}
  })
  if (!user) return null
  return user.orders
}

export const getOrder = async (orderId: number): Promise<OrderWithItems | null> => {
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

export const editItemQuantity = async (productId: number, quantity: number) => {
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

export const deleteItem = async (productId: number) => {
  try {
    await prisma.orderItem.delete({
      where: {id: productId}
    })
    return 'success'
  } catch {
    return 'serverError'
  }
}

export const moveItemToAnotherOrder = async (itemId: number, orderId: number) => {
  try {
    await prisma.order.update({
      where: {id: orderId},
      data: {
        orderItems: {
          connect: {
            id: itemId
          }
        }
      }
    })
    return 'success'
  } catch {
    return 'serverError'
  }
}

export const changeOrderStatus = async (orderId: number, newStatus: string) => {
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