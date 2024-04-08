'use server'

import {waitSecond} from "@/utility/functions";
import {createBrand, CreateBrandType} from "@/lib/db/brand";

export const serverActionCreateNeBrand = async (formData: FormData) => {
  await waitSecond(2)
  console.log(formData)

  const title_ua = formData.get('titleUa') as string
  const title_en = formData.get('titleEn') as string
  const name_en = formData.get('nameEn') as string
  const name_ua = formData.get('nameUa') as string
  const meta_desc_en = formData.get('metaDescEn') as string
  const meta_desc_ua = formData.get('metaDescUa') as string
  const text_en = formData.get('textEn') as string
  const text_ua = formData.get('textUa') as string
  const url = formData.get('url') as string
  const tags = formData.get('tags') as string
  const active = true
  const newBrandData: CreateBrandType = {
    title_ua , url, active, tags, title_en, name_en, name_ua, meta_desc_en, meta_desc_ua, text_ua, text_en
  }
  await createBrand(newBrandData)
}