'use server'

import {redirect} from "next/navigation";
import {checkDictionary} from "@/dictionaries/get-dictionary";
import {searchData} from "@/components/Container/Navbar/SearchInput/types";

export default async function serverActionSearch({search, lang}: searchData) {
  const checkedLang = checkDictionary(lang ? lang : '')
  if (search)
    redirect(`/${checkedLang}/products?search=${encodeURI(search)}`)
}