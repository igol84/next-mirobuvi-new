'use client'
import React, {useState, useTransition} from 'react';
import {Box, Button, ScaleFade} from "@chakra-ui/react";
import {MdShoppingCart} from 'react-icons/md'
import {incrementProductQuantity} from "@/lib/server/cart/action";
import {useTranslations} from "next-intl";


interface Props {
  productId: string
  size?: number | null
}

const AddToCartButton = ({productId, size}: Props) => {
  const t = useTranslations('product')
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const isEnable = size === undefined || size
  const onClick = () => {
    setSuccess(false)
    startTransition(async () => {
      await incrementProductQuantity(productId, size ? size : null)
      setSuccess(true)
    })
  };
  return (
    <>
      <Button onClick={onClick} leftIcon={<MdShoppingCart/>} variant='solid'
              isDisabled={!isEnable} isLoading={isPending}>
        {t('buy')}
      </Button>

      <ScaleFade initialScale={0.9} in={!isPending && success}>
        <Box p='3' mt='4' color='white' bg='teal.500' rounded='md' shadow='md'>
          {t('addedOnCart')}
        </Box>
      </ScaleFade>
    </>
  )
}

export default AddToCartButton;