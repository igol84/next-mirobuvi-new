'use client'

import React from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {IOrder, OrderEditFormSchema, schema} from "./types";
import {serverActionDeleteOrder, serverActionEditOrder} from "./actions";
import {useRouter} from "next/navigation";
import {AiOutlineRollback, AiTwotoneSave} from "react-icons/ai";
import AlertDeleteDialog from "@/components/base/AlertDeleteDialog";
import ProductsEditor from "@/app/[locale]/admin/orders/[orderId]/OrderItemsEditor";
import {useTranslations} from "next-intl";


interface Props {
  orderData: IOrder
}

const OrderForm = ({orderData}: Props) => {
  const t = useTranslations('orderForm')
  const router = useRouter()
  const defaultValues: OrderEditFormSchema = {
    id: orderData.id,
    firstName: orderData.firstName,
    lastName: orderData.lastName,
    phone: orderData.phone,
    email: orderData.email,
    delivery: orderData.delivery
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<OrderEditFormSchema>({
    defaultValues,
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<OrderEditFormSchema> = async (orderFormData) => {
    const response = await serverActionEditOrder({
      id: orderFormData.id,
      firstName: orderFormData.firstName,
      lastName: orderFormData.lastName,
      phone: orderFormData.phone,
      email: orderFormData.email,
      delivery: orderFormData.delivery
    })
    if (response.errors) {
      response.errors.forEach(error => {
        setError(error.field, {
          type: 'server',
          message: error.message
        })
      })
      return
    }
    if (response.success) {
      router.back()
    }
  }
  const onClickDelete = async () => {
    await serverActionDeleteOrder(orderData.id)
    router.back()
  }
  return (
    <Flex direction={{base: 'column', md: 'row'}}>
      <Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('id')} type="hidden"/>
          <Heading as='h2' sx={{pb: 6}}>{t('clientData')}</Heading>
          <FormControl isInvalid={!!errors.firstName} sx={{pb: 4}} isRequired>
            <FormLabel>{t('firstName')}</FormLabel>
            <Input {...register('firstName')} type='text' placeholder={t('firstName')} width='auto'/>
            {errors.firstName &&
              <FormErrorMessage>{t('firstName')} {t(errors.firstName.message!)}</FormErrorMessage>
            }
          </FormControl>
          <FormControl isInvalid={!!errors.lastName} sx={{pb: 4}} isRequired>
            <FormLabel>{t('lastName')}</FormLabel>
            <Input {...register('lastName')} type='text' placeholder={t('lastName')} width='auto'/>
            {errors.lastName &&
              (
                <FormErrorMessage>{t('lastName')} {t(errors.lastName.message!)}</FormErrorMessage>
              )}
          </FormControl>
          <FormControl isInvalid={!!errors.phone} sx={{pb: 4}} isRequired>
            <FormLabel>{t('phoneNumber')}</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                +380
              </InputLeftAddon>
              <Input {...register('phone')} type='number' placeholder={t('phoneNumber')} width='auto'/>
            </InputGroup>
            {errors.phone &&
              (
                <FormErrorMessage>{t('phoneNumber')} {t(errors.phone.message!)}</FormErrorMessage>
              )}
          </FormControl>
          <FormControl isInvalid={!!errors.email} sx={{pb: 4}}>
            <FormLabel>Email</FormLabel>
            <Input {...register('email')} placeholder='Email' width='auto'/>
            {errors.email &&
              (
                <FormErrorMessage>{t(errors.email.message!)}</FormErrorMessage>
              )}
          </FormControl>
          <Heading as='h2' sx={{pb: 6}}>{t('delivery')}</Heading>
          <FormControl isInvalid={!!errors.delivery} sx={{pb: 4}} isRequired>
            <FormLabel>{t('city')}</FormLabel>
            <Input {...register('delivery')} placeholder={t('city')} width='auto'/>
            {errors.delivery
              ? <FormErrorMessage>{errors.delivery.message}</FormErrorMessage>
              : <FormHelperText>{t('cityInfo')}</FormHelperText>
            }
          </FormControl>
          <Flex mt={4} gap={4} direction={{base: 'column', md: 'row'}} wrap='wrap'>
            <Button variant='solid' colorScheme='teal' isLoading={isSubmitting} type='submit'
                    leftIcon={<AiTwotoneSave/>}>
              {t('save')}
            </Button>
            <Button variant='ghost' colorScheme='teal' onClick={router.back} leftIcon={<AiOutlineRollback/>}>
              {t('back')}
            </Button>
            <AlertDeleteDialog onDelete={onClickDelete} headerText={t('deleteOrder')} bodyText={t('sure')}
                               variant='big'/>
          </Flex>
        </form>
      </Flex>
      <Flex>
        <ProductsEditor orderItems={orderData.orderItems}/>
      </Flex>
    </Flex>
  );
};

export default OrderForm;