import 'server-only'

import {NextResponse} from 'next/server'
import {clearOldCart} from "@/lib/db/cart";

export const revalidate = 3600

export async function GET() {
  const carts = await clearOldCart()
  return NextResponse.json(
    {message: {deletedCarts: carts, date: new Date().toJSON()}},
    {status: 200},
  );
}