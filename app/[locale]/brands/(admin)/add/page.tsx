import BrandForm from "@/components/Brands/admin/BrandForm";
import {BrandFormSchema, defaultValues} from "@/components/Brands/admin/types";
import {getBrandNexId, getBrandUrls} from "@/lib/db/brand";
import {getBreadCrumb} from "@/app/[locale]/brands/(admin)/add/serverFunctions";
import {Locale} from "@/i18n/request";


type Props = {
  params: {
    locale: Locale
  }
}


const AddNewBrandPage = async ({params: {locale}}: Props) => {
  const urlsList = await getBrandUrls()
  const breadCrumbs = await getBreadCrumb(locale)
  const nexId = await getBrandNexId()
  const defaultValuesWithId: BrandFormSchema = {...defaultValues, id: nexId}
    return (
    <BrandForm defaultValues={defaultValuesWithId} urlList={urlsList} breadCrumbs={breadCrumbs}/>
  )
}

export default AddNewBrandPage