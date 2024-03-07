import {FilterSizesType} from "@/app/[lang]/[urlTag]/types";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {createUrl} from "@/lib/format";
import {SizesType} from "@/components/Container/FilterMenu/ShoesMenu/Sizes";

type UseSizesType = {
  (
    filterSizes: FilterSizesType
  ): SizesType
}

const useSizesType: UseSizesType = (filterSizes) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  let params = new URLSearchParams(searchParams.toString())
  const onSelectSize = (size: number) => {
    params.delete('page')
    const sizeStr = String(size)
    const sizes = params.getAll('size')
    if (sizes.includes(sizeStr)) {
      params.delete('size', sizeStr)
    } else {
      params.append('size', sizeStr)
    }
    const url = createUrl(pathname, params.toString())
    router.push(url)
  }
  const sizesType: SizesType = {filterSizes, onSelectSize}
  return sizesType
}

export default useSizesType