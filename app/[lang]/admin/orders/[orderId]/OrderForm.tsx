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
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {IOrder, OrderEditFormSchema, schema} from "./types";
import {serverActionDeleteOrder, serverActionEditOrder} from "./actions";
import {useRouter} from "next/navigation";
import {AiOutlineRollback, AiTwotoneSave} from "react-icons/ai";
import AlertDeleteDialog from "@/app/[lang]/admin/orders/[orderId]/AlertDeleteDialog";
import ProductsEditor from "@/app/[lang]/admin/orders/[orderId]/OrderItemsEditor";


interface Props {
  orderData: IOrder
}

const OrderForm = ({orderData}: Props) => {
  const d = useDictionaryTranslate("orderForm")
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
          <Heading as='h2' sx={{pb: 6}}>{d('clientData')}</Heading>
          <FormControl isInvalid={!!errors.firstName} sx={{pb: 4}} isRequired>
            <FormLabel>{d('firstName')}</FormLabel>
            <Input {...register('firstName')} type='text' placeholder={d('firstName')} width='auto'/>
            {errors.firstName &&
              <FormErrorMessage>{d('firstName')} {d(errors.firstName.message!)}</FormErrorMessage>
            }
          </FormControl>
          <FormControl isInvalid={!!errors.lastName} sx={{pb: 4}} isRequired>
            <FormLabel>{d('lastName')}</FormLabel>
            <Input {...register('lastName')} type='text' placeholder={d('lastName')} width='auto'/>
            {errors.lastName &&
              (
                <FormErrorMessage>{d('lastName')} {d(errors.lastName.message!)}</FormErrorMessage>
              )}
          </FormControl>
          <FormControl isInvalid={!!errors.phone} sx={{pb: 4}} isRequired>
            <FormLabel>{d('phoneNumber')}</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                +380
              </InputLeftAddon>
              <Input {...register('phone')} type='number' placeholder={d('phoneNumber')} width='auto'/>
            </InputGroup>
            {errors.phone &&
              (
                <FormErrorMessage>{d('phoneNumber')} {d(errors.phone.message!)}</FormErrorMessage>
              )}
          </FormControl>
          <FormControl isInvalid={!!errors.email} sx={{pb: 4}}>
            <FormLabel>Email</FormLabel>
            <Input {...register('email')} placeholder='Email' width='auto'/>
            {errors.email &&
              (
                <FormErrorMessage>{d(errors.email.message!)}</FormErrorMessage>
              )}
          </FormControl>
          <Heading as='h2' sx={{pb: 6}}>{d('delivery')}</Heading>
          <FormControl isInvalid={!!errors.delivery} sx={{pb: 4}} isRequired>
            <FormLabel>{d('city')}</FormLabel>
            <Input {...register('delivery')} placeholder={d('city')} width='auto'/>
            {errors.delivery
              ? <FormErrorMessage>{errors.delivery.message}</FormErrorMessage>
              : <FormHelperText>{d('cityInfo')}</FormHelperText>
            }
          </FormControl>
          <Flex mt={4} gap={4} direction={{base: 'column', md: 'row'}} wrap='wrap'>
            <Button variant='solid' colorScheme='teal' isLoading={isSubmitting} type='submit'
                    leftIcon={<AiTwotoneSave/>}>
              {d('save')}
            </Button>
            <Button variant='ghost' colorScheme='teal' onClick={router.back} leftIcon={<AiOutlineRollback/>}>
              {d('back')}
            </Button>
            <AlertDeleteDialog onDelete={onClickDelete} headerText={d('deleteOrder')} bodyText={d('sure')}
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