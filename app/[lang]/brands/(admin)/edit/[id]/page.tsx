import {checkForAdmin} from "@/utility/auth";
import {redirect} from "next/navigation";
import {getBrand, getBrandUrls} from "@/lib/db/brand";
import BrandForm from "@/components/Brands/admin/BrandForm";
import {BrandFormSchema} from "@/components/Brands/admin/types";

type Props = {
  params: {
    id: string
  }
}


const EditBrandPage = async ({params: {id}}: Props) => {
  const isAdmin = await checkForAdmin()
  if (!isAdmin) redirect('/')
  const brandId = Number(id)
  const brandData = await getBrand(brandId)
  if (!brandData) redirect('/')
  const allUrlsList = await getBrandUrls()
  const urlsList = allUrlsList.filter(url => url !== brandData.url)
  const defaultValues: BrandFormSchema = {
    id: brandId,
    nameUa: brandData.name_ua,
    nameEn: brandData.name_en,
    titleUa: brandData.title_ua,
    titleEn: brandData.name_en,
    tags: brandData.tags,
    metaDescUa: brandData.meta_desc_ua,
    metaDescEn: brandData.meta_desc_en,
    url: brandData.url,
    textUa: brandData.text_ua,
    textEn: brandData.text_en,
    active: brandData.active,
    fileImg: []
  }

  return (
    <BrandForm defaultValues={defaultValues} urlsList={urlsList}/>
  )
}

export default EditBrandPage