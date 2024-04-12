import {checkForAdmin} from "@/utility/auth";
import { redirect } from 'next/navigation'
import BrandForm from "@/components/Brands/admin/BrandForm";
import {defaultValues} from "@/components/Brands/admin/types";
import {getBrandUrls} from "@/lib/db/brand";

const AddNewBrandPage = async () => {
  const isAdmin = await checkForAdmin()
  const urlsList = await getBrandUrls()
  if(!isAdmin){
    redirect('/')
  }
  return (
    <BrandForm defaultValues={defaultValues} urlsList={urlsList}/>
  )
}

export default AddNewBrandPage