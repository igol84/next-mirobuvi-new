'use client'

import {
  colors,
  DefaultValues,
  ProductFormSchema,
  productTypes,
  schema,
  seasons
} from "@/components/product/admin/types";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea
} from "@chakra-ui/react";
import {useDict} from "@/components/product/admin/hooks";
import {useRouter} from "next/navigation";
import {serverActionCreateProduct} from "@/app/[lang]/brands/[brandUrl]/actions";
import {convertTextForUrl} from "@/utility/functions";


interface ProductFormProps {
  defaultValues: ProductFormSchema | DefaultValues
  urlList: string[],
}

const ProductForm = ({defaultValues, urlList}: ProductFormProps) => {
  const {dict, d} = useDict()
  const router = useRouter()
  const {
    register, handleSubmit, setError,
    formState: {errors, isSubmitting},
  } = useForm<ProductFormSchema>({
    defaultValues,
    resolver: zodResolver(schema)
  })
  const onFormSubmit: SubmitHandler<ProductFormSchema> = async (data, event) => {
    const urlIsConsist = urlList.includes(convertTextForUrl(data.url))
    if (urlIsConsist) {
      setError('url', {
        type: 'server',
        message: 'consist'
      })
    } else {
      const formData = new FormData(event?.target)
      const response = await serverActionCreateProduct(formData)
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
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <input type="hidden" {...register('id')}/>
      <input type="hidden" {...register('brandId')}/>
      <Flex direction='column' gap={2}>
        <Flex alignItems="center" gap={3}>
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

        <Flex alignItems="center" gap={20}>
          <Checkbox {...register('active')}>{d('active')}</Checkbox>
          <Checkbox {...register('private')}>{d('private')}</Checkbox>
          <Checkbox {...register('isAvailable')}>{d('isAvailable')}</Checkbox>
        </Flex>


        <Flex alignItems="center" gap={2}>
          <FormControl isInvalid={!!errors.price}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{d('price')}</Text>
              <NumberInput name={register('price').name} step={10} defaultValue={defaultValues.price} min={10}>
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper/>
                  <NumberDecrementStepper/>
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </FormControl>


          <FormControl isInvalid={!!errors.oldPrice}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{d('oldPrice')}</Text>
              <NumberInput name={register('oldPrice').name} step={10}
                           defaultValue={defaultValues.oldPrice ?? 0} min={0}>
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper/>
                  <NumberDecrementStepper/>
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </FormControl>
        </Flex>

        <Flex alignItems="center" gap={20}>
          <Checkbox {...register('promActive')}>{d('promActive')}</Checkbox>
          <Flex direction='row' alignItems='center' gap={2}>
            <Text>{d('promAddToId')}</Text>
            <NumberInput name={register('promAddToId').name} step={10}
                         defaultValue={defaultValues.promAddToId} min={0}>
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Flex>

        <Flex alignItems="center" gap={2}>
          <Select {...register('season')} placeholder={d('season')} isRequired maxW={200}>
            {seasons.map(season => (
              <option key={season} value={season}>{d(season)}</option>
            ))}
          </Select>
          <Select {...register('color')} placeholder={d('color')} isRequired maxW={200}>
            {colors.map(color => (
              <option key={color} value={color}>{d(color)}</option>
            ))}
          </Select>
        </Flex>

        <Select {...register('type')} maxW={200}>
          {productTypes.map(productType => (
            <option key={productType} value={productType}>{d(productType)}</option>
          ))}
        </Select>

        <FormControl isInvalid={!!errors.filesImg}>
          <Flex direction='row' alignItems='center' gap={2}>
            <Text>{dict.file}</Text>
            <input {...register('filesImg')} type='file' required={!isSubmitting} multiple accept='image/jpeg'/>
            {errors.filesImg && (
              <FormErrorMessage>{dict.file1}</FormErrorMessage>
            )}
          </Flex>
        </FormControl>

        <Flex direction='row' alignItems='center' gap={2} justifyContent='space-between' pt={30}>
          <Flex pt={4}>
            <Button mr={3} variant='green' type='submit' isLoading={isSubmitting}>{dict.save}</Button>
            <Button onClick={router.back}>{dict.cancel}</Button>
          </Flex>
        </Flex>

      </Flex>
    </form>
  )
}

export default ProductForm