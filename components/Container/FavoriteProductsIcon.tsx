import React from 'react';
import {Box, IconButton, Tooltip} from "@chakra-ui/react";
import {FaRegHeart} from "react-icons/fa";
import {useStore} from "@/lib/store";
import {useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";

const FavoriteProductsIcon = () => {
  const t = useTranslations('favorite')
  const locale = useLocale()
  const user = useStore(
    state => state.user
  )
  const count = user ? user.favoriteProducts.size : 0
  const label = count ? '' : t('header')
  const router = useRouter()
  const onClick = () => {
    if (count > 0)
      router.push(`/${locale}/profile/favorite-products`)
  }
  return (
    <Tooltip hasArrow label={label}>
      <Box position='relative' onClick={onClick}>
        <IconButton isRound={true} aria-label='Fan' fontSize={[20, 25, 30, 35]} icon={<FaRegHeart/>}
                    minW={[1, 2]} variant='outline'/>
        {count > 0 && (
          <Box position='absolute' textAlign='center' justifyContent='center' h={5} w={6} borderRadius={25} right={0}
               top={0} backgroundColor={'green.400'} fontWeight='bold' _hover={{cursor: 'pointer'}}
          >
            <Box position='absolute' alignItems='center' justifyContent='center' color={'teal.800'} userSelect='none'
                 left='0px' top='-1px' padding='0px 2px' w={6} fontSize='14px' whiteSpace='nowrap'>
              {count}
            </Box>
          </Box>
        )}
      </Box>
    </Tooltip>
  );
};

export default FavoriteProductsIcon;