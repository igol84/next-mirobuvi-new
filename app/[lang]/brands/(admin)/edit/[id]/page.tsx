import {checkForAdmin} from "@/utility/auth";
import {redirect} from "next/navigation";
import {getBrand, getBrandUrls} from "@/lib/db/brand";
import BrandForm from "@/components/Brands/admin/BrandForm";
import {BrandFormSchema} from "@/components/Brands/admin/types";
import {getFTPClient, isFileExist} from "@/lib/ftp";
import {env} from "@/lib/env";
import {getBrandsData} from "@/app/api/fetchFunctions";

import {Lang} from "@/dictionaries/get-dictionary";
import {getBreadCrumb} from "@/app/[lang]/brands/(admin)/edit/[id]/serverFunctions";

export async function generateStaticParams() {
  const brandsData = await getBrandsData()
  return brandsData.map(brand => ({id: String(brand.id)}))
}

type Props = {
  params: {
    lang: Lang
    id: string
  }
}

const EditBrandPage = async ({params: {lang, id}}: Props) => {
  const isAdmin = await checkForAdmin()
  if (!isAdmin) redirect('/')
  const brandId = Number(id)
  const brandData = await getBrand(brandId)
  if (!brandData) redirect('/')
  const allUrlList = await getBrandUrls()
  const urlList = allUrlList.filter(url => url !== brandData.url)
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

  const ftpClient = await getFTPClient(env.FTP_HOST, env.FTP_USER, env.FTP_PASS)
  const imgExist = await isFileExist(ftpClient, "brands", `${brandData.url}.jpeg`)
  const imgUrl = imgExist ? `${env.FTP_URL}/brands/${brandData.url}.jpeg?key=${brandData.updatedAt}` : null
  const brandName = lang==='en' ? brandData.name_en : brandData.name_ua
  const breadCrumbs = await getBreadCrumb(lang, brandName, brandData.url)

  return (
    <BrandForm defaultValues={defaultValues} urlList={urlList} imgUrl={imgUrl} breadCrumbs={breadCrumbs}/>
  )
}

export default EditBrandPage