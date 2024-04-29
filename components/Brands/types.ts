import {env} from "@/lib/env";

export type BrandProps = {
  brandId: number
  brandName: string
  url: string
  desc: string
  imgUrl: string
}

export type BrandCardProps = Omit<BrandProps, 'desc'>
export type BrandCardPropsWithFirst = BrandCardProps & {isFirst: boolean}
export type BrandCardPropsWithFirstAdmin = BrandCardPropsWithFirst & {isAdmin: boolean}

export const getBrandsImageUrl = (brandName: string, key: number = 0): string => {
  return `${env.FTP_URL}/brands/${brandName}.jpeg?key=${key}`
}