import {FilterGender, FilterGenderType} from "@/app/[lang]/[urlTag]/types";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {createUrl} from "@/lib/format";
import {GenderType} from "@/components/Container/FilterMenu/ShoesMenu/Gender";

type UseGender = {
  (
    filterGenderType: FilterGenderType
  ): GenderType
}

const useFiltersGender: UseGender = (filterGenderType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  let params = new URLSearchParams(searchParams.toString())
  const onClick = (gender: FilterGender) => {
    if (gender) {
      params.delete('page')
      if (params.has('gender', gender))
        params.delete('gender')
      else
        params.set('gender', gender)
      const url = createUrl(pathname, params.toString())
      router.push(url)
    }
  }
  const genderType: GenderType = {filterGenderType, onClick}
  return genderType
}

export default useFiltersGender