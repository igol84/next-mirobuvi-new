import {checkForAdmin} from "@/utility/auth";
import { redirect } from 'next/navigation'
import BrandForm from "@/components/Brands/admin/BrandForm";
import {defaultValues} from "@/components/Brands/admin/types";

const AddNewBrandPage = async () => {
  const isAdmin = await checkForAdmin()
  if(!isAdmin){
    redirect('/')
  }
  return (
    <BrandForm defaultValues={defaultValues}/>
  )
}

export default AddNewBrandPage