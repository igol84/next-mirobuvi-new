import {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";
import {FilterMenuPriceType, FilterMenuType, FilterProductType} from "@/app/[lang]/[urlTag]/types";
import {ProductTypeType} from "@/components/Container/FilterMenu/ProductType";
import useFiltersProductType from "@/lib/store/filters/hooks/useFiltersProductType";
import useFiltersPrice from "@/lib/store/filters/hooks/useFiltersPrice";
import {ShoesMenuType} from "@/components/Container/FilterMenu/ShoesMenu";
import useShoesMenu from "@/lib/store/filters/hooks/useShoesMenu";


type UseFilters = {
  (
    filterMenuPriceType: FilterMenuPriceType,
    filterProductType: FilterProductType,
    filterMenuType: FilterMenuType,
  ): {
    priceFilterType: PriceFilterType,
    productTypeType: ProductTypeType,
    shoesMenuType: ShoesMenuType
  }
}

const useFilters: UseFilters = (filterMenuPriceType, filterProductType, filterMenuType) => {
  const priceFilterType = useFiltersPrice(filterMenuPriceType)
  const productTypeType = useFiltersProductType(filterProductType)
  const shoesMenuType = useShoesMenu(filterMenuType)
  return {priceFilterType, productTypeType, shoesMenuType}
}

export default useFilters
