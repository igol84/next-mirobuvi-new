'use client'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
  Text,
  Textarea
} from "@chakra-ui/react";
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BrandFormSchema, schema} from "@/components/Brands/admin/types";
import {serverActionCreateOrEditBrand, serverActionDeleteBrand} from "@/app/[locale]/brands/actions";
import {useRouter} from "next/navigation";
import {useDict} from "@/components/Brands/admin/hooks";
import NextImage from "next/image";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import AlertDeleteDialog from "@/components/base/AlertDeleteDialog";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";
import {convertTextForUrl} from "@/utility/functions";


type Props = {
  defaultValues: BrandFormSchema,
  urlList: string[],
  imgUrl?: string | null,
  breadCrumbs: BreadCrumbData[]
}

const BrandForm = ({defaultValues, urlList, imgUrl, breadCrumbs}: Props) => {
  const isEditing = !!defaultValues.selectedId
  const {dict, d} = useDict()
  const router = useRouter()
  const {
    register, handleSubmit, setError,
    formState: {errors, isSubmitting},
  } = useForm<BrandFormSchema>({
    defaultValues,
    resolver: zodResolver(schema)
  })
  const onFormSubmit: SubmitHandler<BrandFormSchema> = async (data, event) => {
    const urlIsConsist = urlList.includes(convertTextForUrl(data.url))
    if (urlIsConsist) {
      setError('url', {
        type: 'server',
        message: 'consist'
      })
    } else {
      const formData = new FormData(event?.target)
      const response = await serverActionCreateOrEditBrand(formData)
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
        router.push(`/brands`)
      }
    }
  }

  const headingText = isEditing ? dict.editBrand : dict.addBrand
  const [idDeleting, setIsDeleting] = useState<boolean>(false)
  const isLoading = isSubmitting || idDeleting
  const onDelete = isEditing
    ? async () => {
      setIsDeleting(true)
      const brandId = defaultValues.selectedId as number
      await serverActionDeleteBrand(brandId)
      setIsDeleting(false)
      router.push(`/brands`)
    }
    : () => undefined
  const onClickCancel = () => {
    router.push(`/brands`)
  }
  return (
    <Flex direction="column" gap={2} justify="space-between">
      <BreadCrumb breadCrumbs={breadCrumbs}/>
      <Heading as='h1'>{headingText}</Heading>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input type="hidden" {...register('selectedId')}/>
        <Flex direction='row' alignItems='center' gap={2}>
          <Text>id</Text>
          <FormControl isInvalid={!!errors.id} isRequired>
            <NumberInput name={register('id').name}
                         defaultValue={defaultValues.id} min={0}>
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
              </NumberInputStepper>
            </NumberInput>
            {errors.id && (
              <FormErrorMessage>id {dict[errors.id.message! as 'consist']}</FormErrorMessage>
            )}
          </FormControl>

          <Text>Order number</Text>
          <FormControl isRequired>
            <NumberInput name={register('orderNumber').name}
                         defaultValue={defaultValues.orderNumber} min={0}>
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Flex>
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
                <FormErrorMessage>{dict.url} {dict[errors.url.message! as 'consist']}</FormErrorMessage>
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
            <Checkbox {...register('active')}>{d('active')}</Checkbox>
            <Checkbox {...register('private')}>{d('private')}</Checkbox>
          </Flex>


          <FormControl isInvalid={!!errors.fileImg}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{dict.file}</Text>
              {!!imgUrl && <ChakraNextImage
                as={NextImage} src={imgUrl} shadow='base' borderRadius={[30, 15]}
                width={49} height={49} alt={`photo`}
              />}
              <input {...register('fileImg')} type='file' required={!isEditing}  accept='image/jpeg'/>
              {errors.fileImg && (
                <FormErrorMessage>{dict.file1}</FormErrorMessage>
              )}
            </Flex>
          </FormControl>

        </Flex>
        <Flex direction='row' alignItems='center' gap={2} justifyContent='space-between'>
          <Flex pt={4}>
            <Button mr={3} variant='green' type='submit' isLoading={isLoading}>{dict.save}</Button>
            <Button onClick={onClickCancel}>{dict.cancel}</Button>
          </Flex>
          <Box>
            {isEditing && (
              <AlertDeleteDialog onDelete={onDelete} bodyText='' headerText={dict.del} variant='big'
                                 isLoading={isLoading}/>
            )}
          </Box>
        </Flex>
      </form>
    </Flex>
  )
}

export default BrandForm