'use server'

import {redirect} from "next/navigation";
import {searchData} from "@/components/Container/Navbar/SearchInput/types";

export default async function serverActionSearch({search, locale}: searchData) {
  if (search)
    redirect(`/${locale}/products?search=${encodeURI(search)}`)
}