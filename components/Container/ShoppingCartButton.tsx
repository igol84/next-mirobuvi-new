import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger
} from "@chakra-ui/react";
import React, {ReactNode, useContext} from "react";
import ScrollingBox from "@/components/base/ScrollingBox";
import {TotalData} from "@/components/Container/Navbar/functions";
import {formatPrice} from "@/lib/format";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {PiShoppingCart} from "react-icons/pi";
import {useRouter} from "next/navigation";


interface Props {
  children: ReactNode
  totalData: TotalData
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export default function ShoppingCartButton({children, totalData, isOpen, onToggle, onClose}: Props) {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("cart")
  const isEmpty = totalData.total === 0
  const router = useRouter()
  const onClickCheckout = () => {
    onClose()
    router.push('/make-order')
  }
  return (
    <Popover isOpen={isOpen} onClose={onClose} placement='bottom' autoFocus={false}>
      <PopoverTrigger aria-label='Cart'>
        <Box position='relative' onClick={onToggle}>
          <IconButton isRound={true} aria-label='Cart' fontSize={[20, 25, 30, 35]} icon={<PiShoppingCart/>}
                      minW={[1, 2]}/>
          {!isEmpty && (
            <Box position='absolute' textAlign='center' justifyContent='center' h={5} w={6} borderRadius={25} right={0}
                 top={0} backgroundColor={'green.400'} fontWeight='bold' _hover={{cursor: 'pointer'}}
            >
              <Box position='absolute' alignItems='center' justifyContent='center' color={'teal.800'} userSelect='none'
                   left='0px' top='-1px' padding='0px 2px' w={6} fontSize='14px' whiteSpace='nowrap'>
                {totalData.count}
              </Box>
            </Box>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent w={[310, 400]}>
        <PopoverHeader fontWeight='semibold'>{isEmpty ? d('emptyCart') : d('cart')}</PopoverHeader>
        <PopoverArrow/>
        <PopoverCloseButton/>
        <PopoverBody p={'6px 0px'}>
          <ScrollingBox display={'block'} overflowY={'auto'} maxH={80}>
            {children}
          </ScrollingBox>
        </PopoverBody>
        {!isEmpty && (
          <PopoverFooter display='flex' alignItems='center' justifyContent='space-between'>
            <Box fontWeight='bold'>
              {d('total')}: {formatPrice(totalData.total, lang)}
            </Box>
            <Button variant={'cartCheckout'} onClick={onClickCheckout}>{d('checkout')}</Button>
          </PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  );
}
