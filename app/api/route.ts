import {NextRequest, NextResponse} from 'next/server'
import {z} from "zod";
import {getProducts, updateProduct} from "@/lib/db/product";
import {getAllImages, getFTPClient} from "@/lib/ftp";
import {env} from "@/lib/env";

const DataType = z.object({
  from: z.coerce.number(),
  to: z.coerce.number()
})
export async function GET(request: NextRequest): Promise<NextResponse<{ text: string }>> {
  const {searchParams} = new URL(request.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const {data, success} = DataType.safeParse({from, to})
  if(success) {
    const {from, to} = data
    const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
    const products = await getProducts()
    for (const product of products) {
      if(product.id>=from && product.id<=to) {
        const imagesNames = await getAllImages(ftpClient, `products/${product.url}`)
        const imgCount = imagesNames.length
        await updateProduct(product.id, {imgCount: imgCount})
      }
    }
    ftpClient.close()
  }


  return NextResponse.json({text: `${from}-${to}`})
}