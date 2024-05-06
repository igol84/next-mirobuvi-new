'use client'
import React, {useContext} from 'react'
import {Box, IconButton, Wrap, WrapItem} from "@chakra-ui/react"
import BrandCard from "@/components/Brands/BrandCard"
import {BrandCardPropsWithFirst} from "@/components/Brands/types"
import {AddIcon} from "@chakra-ui/icons";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {useRouter} from 'next/navigation'
import {IsAdminContext} from "@/app/providers";


type Props = {
  brands: BrandCardPropsWithFirst[]
}

const Brands = ({brands}: Props) => {
  const isAdmin = useContext(IsAdminContext)
  const d = useDictionaryTranslate("brandsAdmin")
  const dict = {'addBrand': d('addBrand')}
  const router = useRouter()
  const onAddClick = () => {
    router.push('/brands/add')
  }
  return (
    <>
      {isAdmin && (
        <Box pb={2}>
          <IconButton aria-label={dict.addBrand} onClick={onAddClick} icon={<AddIcon/>}/>
        </Box>
      )}
      <Wrap align='center' justify={{base: 'center', lg: 'flex-start'}} spacing={[4, 4, 4, 2, 4]}>
        {brands.map(brand => (
          <WrapItem key={brand.url}>
            <article>
              <BrandCard isFirst={brand.isFirst} brandId={brand.brandId} brandName={brand.brandName} url={brand.url}
                         imgUrl={brand.imgUrl}/>
            </article>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}

export default Brands