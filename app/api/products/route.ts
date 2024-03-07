import 'server-only'
import {NextResponse} from 'next/server'
import {Data} from "@/schemas/data";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const res = await fetch(`https://mirobuvi.com.ua/xml_ftp/data.json`, {next: {revalidate: 3600}})
  const data: Data = await res.json()

  const brandId = searchParams.get('brandId')
  if (brandId) {
    const products = data.products.filter(product => product.brand_id === Number(brandId))
    return NextResponse.json(products)
  }

  const productUrl = searchParams.get('url')
  if (productUrl) {
    const product = data.products.find(product => product.url === productUrl)
    return NextResponse.json(product)
  }

  const products = data.products.map(product => ({url: product.url}))
  return NextResponse.json(products)
}