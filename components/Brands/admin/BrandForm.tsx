'use client'
import {Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/react";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BrandFormSchema, schema} from "@/components/Brands/admin/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {serverActionCreateNewBrand} from "@/app/[lang]/brands/actions";
import {useRouter} from "next/navigation";

type Props = {
  defaultValues: BrandFormSchema,
}

const BrandForm = ({defaultValues}: Props) => {
  const d = useDictionaryTranslate("brandsAdmin")
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<BrandFormSchema>({
    defaultValues,
    resolver: zodResolver(schema)
  })


  const onFormSubmit: SubmitHandler<BrandFormSchema> = async (data, event) => {
    const formData = new FormData(event?.target);
    const response = await serverActionCreateNewBrand(formData)
    if (response.errors) {
      response.errors.forEach(error => {
        setError(error.field, {
          type: 'server',
          message: error.message
        })
      })
      return
    } else if (response.serverErrors) {
      console.log(response.serverErrors)
    }
    if (response.success) {
      router.back()
    }
  }
  const dict = {
    'nameUa': d('nameUa'),
    'nameEn': d('nameEn'),
    'file': d('file'),
    'url': d('url'),
    'gt2': d('gt2'),
    'file1': d('file1'),
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Flex direction='column' gap={2}>
          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.nameUa} isRequired>
              <FormLabel>{dict.nameUa}</FormLabel>
              <Input {...register('nameUa')} placeholder={dict.nameUa}/>
              {errors.nameUa && (
                <FormErrorMessage>{dict.nameUa} {dict.gt2}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.nameEn} isRequired>
              <FormLabel>{dict.nameEn}</FormLabel>
              <Input {...register('nameEn')} placeholder={dict.nameEn}/>
              {errors.nameEn && (
                <FormErrorMessage>{dict.nameEn} {dict.gt2}</FormErrorMessage>
              )}
            </FormControl>
          </Flex>


          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.titleUa}>
              <FormLabel>{d('titleUa')}</FormLabel>
              <Input {...register('titleUa')} placeholder={d('titleUa')}/>
            </FormControl>

            <FormControl isInvalid={!!errors.titleEn}>
              <FormLabel>{d('titleEn')}</FormLabel>
              <Input {...register('titleEn')} placeholder={d('titleEn')}/>
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.metaDescUa}>
              <FormLabel>{d('metaDescUa')}</FormLabel>
              <Input {...register('metaDescUa')} placeholder={d('metaDescUa')}/>
            </FormControl>

            <FormControl isInvalid={!!errors.metaDescEn}>
              <FormLabel>{d('metaDescEn')}</FormLabel>
              <Input {...register('metaDescEn')} placeholder={d('metaDescEn')}/>
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.tags}>
              <FormLabel>{d('tags')}</FormLabel>
              <Input {...register('tags')} placeholder={d('tags')}/>
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.url} isRequired>
              <FormLabel>{dict.url}</FormLabel>
              <Input {...register('url')} placeholder={dict.url}/>
              {errors.url && (
                <FormErrorMessage>{dict.url} {dict.gt2}</FormErrorMessage>
              )}
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.textUa}>
              <FormLabel>{d('textUa')}</FormLabel>
              <Textarea {...register('textUa')} placeholder={d('textUa')}/>
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.textEn}>
              <FormLabel>{d('textEn')}</FormLabel>
              <Textarea {...register('textEn')} placeholder={d('textEn')}/>
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <Checkbox {...register('active')}>Active</Checkbox>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.fileImg}>
              <FormLabel>{dict.file}</FormLabel>
              <input {...register('fileImg')} type='file' required/>
              {errors.fileImg && (
                <FormErrorMessage>{dict.file1}</FormErrorMessage>
              )}
            </FormControl>
          </Flex>
        </Flex>
        <Flex>
          <Button mr={3} variant='green' type='submit' isLoading={isSubmitting}>
            Save
          </Button>
          <Button onClick={router.back}>Cancel</Button>
        </Flex>
      </form>
    </Box>
  )
}

export default BrandForm