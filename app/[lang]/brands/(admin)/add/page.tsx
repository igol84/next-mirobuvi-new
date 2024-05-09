import BrandForm from "@/components/Brands/admin/BrandForm";
import {BrandFormSchema, defaultValues} from "@/components/Brands/admin/types";
import {getBrandNexId, getBrandUrls} from "@/lib/db/brand";
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
  const nexId = await getBrandNexId()
  const defaultValuesWithId: BrandFormSchema = {...defaultValues, id: nexId}
    return (
    <BrandForm defaultValues={defaultValuesWithId} urlList={urlsList} breadCrumbs={breadCrumbs}/>
  )
}

export default AddNewBrandPage