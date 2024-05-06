import BrandForm from "@/components/Brands/admin/BrandForm";
import {defaultValues} from "@/components/Brands/admin/types";
import {getBrandUrls} from "@/lib/db/brand";
import {getBreadCrumb} from "@/app/[lang]/brands/(admin)/add/serverFunctions";
import {Lang} from "@/dictionaries/get-dictionary";

type Props = {
  params: {
    lang: Lang
  }
}


const AddNewBrandPage = async ({params: {lang}}: Props) => {
  const urlsList = await getBrandUrls()
  const breadCrumbs = await getBreadCrumb(lang)
    return (
    <BrandForm defaultValues={defaultValues} urlList={urlsList} breadCrumbs={breadCrumbs}/>
  )
}

export default AddNewBrandPage