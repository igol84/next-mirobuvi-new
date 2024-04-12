'use client'
import {Button, Checkbox, Flex, FormControl, FormErrorMessage, Heading, Input, Text, Textarea} from "@chakra-ui/react";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BrandFormSchema, schema} from "@/components/Brands/admin/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {serverActionCreateOrEditBrand} from "@/app/[lang]/brands/actions";
import {useRouter} from "next/navigation";


type Props = {
  defaultValues: BrandFormSchema,
  urlsList: string[]
}

const BrandForm = ({defaultValues, urlsList}: Props) => {
  const isEditing = !!defaultValues.id
  const d = useDictionaryTranslate("brandsAdmin")
  const dg = useDictionaryTranslate("global")
  const router = useRouter()
  const {
    register, handleSubmit, setError,
    formState: {errors, isSubmitting},
  } = useForm<BrandFormSchema>({
    defaultValues,
    resolver: zodResolver(schema)
  })
  const onFormSubmit: SubmitHandler<BrandFormSchema> = async (data, event) => {
    const urlIsConsist = urlsList.includes(data.url)
    if (urlIsConsist) {
      setError('url', {
        type: 'server',
        message: 'consist'
      })
    } else {
      const formData = new FormData(event?.target)
      const action = isEditing ? serverActionCreateOrEditBrand : serverActionCreateOrEditBrand
      const response = await action(formData)
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

  }
  const dict = {
    'nameUa': d('nameUa'),
    'nameEn': d('nameEn'),
    'file': d('file'),
    'url': d('url'),
    'gt2': d('gt2'),
    'file1': d('file1'),
    'addBrand': d('addBrand'),
    'editBrand': d('editBrand'),
    'cancel': dg('cancel'),
    'save': dg('save'),
  }
  const headingText = isEditing ? dict.editBrand : dict.addBrand
  return (
    <Flex direction="column" gap={2} justify="space-between">
      <Heading as='h1'>{headingText}</Heading>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input type="hidden" {...register('id')}/>
        <Flex direction='column' gap={2}>
          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.nameUa} isRequired>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{dict.nameUa}</Text>
                <Input {...register('nameUa')} placeholder={dict.nameUa}/>
                {errors.nameUa && (
                  <FormErrorMessage>{dict.nameUa} {dict.gt2}</FormErrorMessage>
                )}
              </Flex>
            </FormControl>

            <FormControl isInvalid={!!errors.nameEn} isRequired>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{dict.nameEn}</Text>
                <Input {...register('nameEn')} placeholder={dict.nameEn}/>
                {errors.nameEn && (
                  <FormErrorMessage>{dict.nameEn} {dict.gt2}</FormErrorMessage>
                )}
              </Flex>
            </FormControl>
          </Flex>


          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.titleUa}>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{d('titleUa')}</Text>
                <Input {...register('titleUa')} placeholder={d('titleUa')}/>
              </Flex>
            </FormControl>

            <FormControl isInvalid={!!errors.titleEn}>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{d('titleEn')}</Text>
                <Input {...register('titleEn')} placeholder={d('titleEn')}/>
              </Flex>
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.metaDescUa}>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{d('metaDescUa')}</Text>
                <Input {...register('metaDescUa')} placeholder={d('metaDescUa')}/>
              </Flex>
            </FormControl>

            <FormControl isInvalid={!!errors.metaDescEn}>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{d('metaDescEn')}</Text>
                <Input {...register('metaDescEn')} placeholder={d('metaDescEn')}/>
              </Flex>
            </FormControl>
          </Flex>

          <FormControl isInvalid={!!errors.tags}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{d('tags')}</Text>
              <Input {...register('tags')} placeholder={d('tags')}/>
            </Flex>
          </FormControl>


          <FormControl isInvalid={!!errors.url} isRequired>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{dict.url}</Text>
              <Input {...register('url')} placeholder={dict.url}/>
              {errors.url && (
                <FormErrorMessage>{dict.url} {d(errors.url.message!)}</FormErrorMessage>
              )}
            </Flex>
          </FormControl>

          <FormControl isInvalid={!!errors.textUa}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{d('textUa')}</Text>
              <Textarea {...register('textUa')} placeholder={d('textUa')}/>
            </Flex>
          </FormControl>

          <FormControl isInvalid={!!errors.textEn}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{d('textEn')}</Text>
              <Textarea {...register('textEn')} placeholder={d('textEn')}/>
            </Flex>
          </FormControl>

          <Flex alignItems="center" gap={2}>
            <Checkbox {...register('active')}>Active</Checkbox>
          </Flex>


          <FormControl isInvalid={!!errors.fileImg}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{dict.file}</Text>
              <input {...register('fileImg')} type='file' required={!isEditing}/>
              {errors.fileImg && (
                <FormErrorMessage>{dict.file1}</FormErrorMessage>
              )}
            </Flex>
          </FormControl>

        </Flex>
        <Flex pt={4}>
          <Button mr={3} variant='green' type='submit' isLoading={isSubmitting}>{dict.save}</Button>
          <Button onClick={router.back}>{dict.cancel}</Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default BrandForm