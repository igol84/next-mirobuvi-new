'use client'
import React, {useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react";
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {OrderFormProps, OrderFormSchema, schema} from "./types";
import {serverAction} from "./actions";
import EmptyCart from "./EmptyCart";
import SuccessOrderDialog from "./SuccessOrderDialog";


const OrderForm = ({isAuthorized, isCarNotEmpty}: OrderFormProps) => {
  const d = useDictionaryTranslate("orderForm")
  const [isSuccess, setIsSuccess] = useState(false)
  const defaultValues: OrderFormSchema = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    delivery: ''
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<OrderFormSchema>({
    defaultValues,
    resolver: zodResolver(schema)
  })
  const onSubmit: SubmitHandler<OrderFormSchema> = async (orderFormData) => {
    const response = await serverAction({
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
      setIsSuccess(true)
    }
  }

  return (
    <Box>
      {isCarNotEmpty ? (
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button variant='solid' mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
            {d('submit')}
          </Button>
        </form>
      ) : (
        <EmptyCart/>
      )}
      <SuccessOrderDialog isOpen={isSuccess} isAuthorized={isAuthorized}/>
    </Box>
  )
}


export default OrderForm;