import React, {useContext, useState} from 'react';
import {IOrderItem} from "@/app/[lang]/admin/orders/[orderId]/types";
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
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {serverActionDeleteItem, serverActionEditItemQuantity} from "@/app/[lang]/admin/orders/[orderId]/actions";
import AlertDeleteDialog from "@/app/[lang]/admin/orders/[orderId]/AlertDeleteDialog";

interface Props {
  orderItem: IOrderItem
}

const ItemEditor = ({orderItem}: Props) => {
  const isWithSize = orderItem.size !== null
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("orderForm")
  const productName = lang === 'en' ? orderItem.productNameEn : orderItem.productNameUa
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
  const errorTextTranslated = d(errorText)
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
            as={NextImage} src={`https://mirobuvi.com.ua/ftp_products/${orderItem.imgUrl}/02.jpg`}
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
      <AlertDeleteDialog onDelete={onDeleteItem} headerText={d('deleteOrderItem')} bodyText={d('sure')}/>
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