import React, {useState} from 'react';
import {IOrderItem} from "@/app/[locale]/admin/orders/[orderId]/types";
import {
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
  Tooltip
} from "@chakra-ui/react";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {serverActionDeleteItem, serverActionEditItemQuantity} from "@/app/[locale]/admin/orders/[orderId]/actions";
import AlertDeleteDialog from "@/components/base/AlertDeleteDialog";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";

interface Props {
  orderItem: IOrderItem
}

const ItemEditor = ({orderItem}: Props) => {
  const isWithSize = orderItem.size !== null
  const t = useTranslations('orderForm')
  const locale = useLocale() as Locale
  const productName = locale === 'en' ? orderItem.productNameEn : orderItem.productNameUa
  const size = orderItem.size ? ' ' + orderItem.size : ''
  const [quantity, setQuantity] = useState(orderItem.quantity)
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState<'success' | 'serverError'>('success')
  const onChangeQuantityValue = (value: string) => {
    const quantityValue = Number(value)
    if (quantityValue > 0 && quantityValue < 30)
      setQuantity(Number(value))
  }
  const onChangeQuantity = async () => {
    setLoading(true)
    const response = await serverActionEditItemQuantity(orderItem.productId, quantity)
    setErrorText(response)
    setLoading(false)
  }
  const errorTextTranslated = t(errorText)
  const onDeleteItem = async () => {
    setLoading(true)
    const response = await serverActionDeleteItem(orderItem.productId)
    setErrorText(response)
    setLoading(false)
  }
  return (
    <Flex alignItems='center' gap={2} wrap='wrap'>
      <Tooltip label={productName} fontSize='md'>
        <Box>
          <ChakraNextImage
            as={NextImage} src={orderItem.imgUrl}
            alt={'image'} width={49} height={49} sizes="100vw" borderRadius={[30, 15]}
          />
        </Box>
      </Tooltip>
      {isWithSize && <Box>{size}</Box>}
      <NumberInput isDisabled={loading} width={24} value={quantity} onChange={onChangeQuantityValue}
                   onBlur={onChangeQuantity}>
        <NumberInputField/>
        <NumberInputStepper>
          <NumberIncrementStepper/>
          <NumberDecrementStepper/>
        </NumberInputStepper>
      </NumberInput>
      <AlertDeleteDialog onDelete={onDeleteItem} headerText={t('deleteOrderItem')} bodyText={t('sure')}/>
      <Spinner hidden={!loading}/>
      {errorText !== 'success' && (
        <Text color='tomato'>
          {errorTextTranslated}
        </Text>
      )}
    </Flex>
  )
};

export default ItemEditor;