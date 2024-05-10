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
import React, {useState} from "react";
import {
  Box,
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
import {
  serverActionCreateOrEditProduct,
  serverActionDeleteImage,
  serverActionDeleteProduct,
  serverActionRenameImages
} from "@/app/[lang]/brands/[brandUrl]/actions";
import {convertTextForUrl} from "@/utility/functions";
import ProductImages from "@/components/product/admin/ProductImages";
import {Image} from "@/components/product/admin/ProductImage";
import AlertDeleteDialog from "@/components/base/AlertDeleteDialog";
import Sizes from "@/components/product/admin/shoes/Sizes";
import {SizeType} from "@/components/product/admin/shoes/types";


interface ProductFormProps {
  defaultValues: ProductFormSchema | DefaultValues,
  urlList: string[],
  urlImages?: Image[]
  shoeses: SizeType[]
}

const ProductForm = ({defaultValues, urlList, urlImages = [], shoeses}: ProductFormProps) => {
  const [selectedType, setSelectedType] = useState(defaultValues.type)
  const [shoes, setShoes] = useState(shoeses)
  const {dict, d, dc, ds} = useDict()
  const router = useRouter()
  const isEditing = !!defaultValues.selectedId
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
      formData.append("shoes", JSON.stringify(shoes))
      const response = await serverActionCreateOrEditProduct(formData)
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
  const [idDeleting, setIsDeleting] = useState<boolean>(false)
  const isLoading = isSubmitting || idDeleting
  const headerRenameImages = async (names: string[]): Promise<Image[]> => {
    return await serverActionRenameImages(defaultValues.selectedId as number, defaultValues.url, names)
  }
  const headerDeleteImage = async (name: string, names: string[]): Promise<Image[] | null> => {
    return await serverActionDeleteImage(defaultValues.selectedId as number, defaultValues.url, name, names)
  }
  const onDelete = isEditing
    ? async (): Promise<void> => {
      setIsDeleting(true)
      await serverActionDeleteProduct(defaultValues.selectedId as number)
      setIsDeleting(false)
      router.back()
    } : () => undefined

  const onAddSize = () => {
    if (shoes.length > 0) {
      const lastShoes = shoes[shoes.length - 1] as SizeType
      const newShoes: SizeType = {
        size: lastShoes.size + 1,
        isAvailable: lastShoes.isAvailable,
        length: lastShoes.length + 0.5
      }
      setShoes(shoeses => [...shoeses, newShoes])
    } else {
      setShoes([{size: 36, isAvailable: true, length: 23.5}])
    }
  }

  const onChangeSize = (oldSize: SizeType, newSize: SizeType) => {
    setShoes(shoeses => shoeses.map(size => {
      if (size === oldSize)
        return newSize
      return size
    }))
  }

  const onDeleteSize = (delSize: SizeType) => {
    setShoes(shoeses => shoeses.filter(size => size !== delSize))
  }
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <input type="hidden" {...register('selectedId')}/>
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

          <FormControl isInvalid={!!errors.nameRu} isRequired>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{dict.nameRu}</Text>
              <Input {...register('nameRu')} placeholder={dict.nameRu}/>
              {errors.nameRu && (
                <FormErrorMessage>{dict.nameRu} {dict.gt2}</FormErrorMessage>
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

        <FormControl isInvalid={!!errors.textRu}>
          <Flex direction='row' alignItems='center' gap={2}>
            <Text>{d('textRu')}</Text>
            <Textarea {...register('textRu')} placeholder={d('textRu')}/>
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
          </Flex>
          <Flex direction='row' alignItems='center' gap={2}>
            <Text>{d('promAddToId')}</Text>
            <NumberInput name={register('promAddToId').name}
                         defaultValue={defaultValues.promAddToId} min={0}>
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Flex>
        <Flex direction='row' alignItems='center' gap={2}>
          <ProductImages images={urlImages} headerRenameImages={headerRenameImages}
                         headerDeleteImage={headerDeleteImage}/>
        </Flex>
        <FormControl isInvalid={!!errors.filesImg}>
          <Flex direction='row' alignItems='center' gap={2}>
            <Text>{dict.file}</Text>
            <input {...register('filesImg')} type='file' required={!isEditing} multiple accept='image/jpeg'/>
            {errors.filesImg && (
              <FormErrorMessage>{dict.file1}</FormErrorMessage>
            )}
          </Flex>
        </FormControl>
        <Select {...register('type')} maxW={200} onChange={(value) => setSelectedType(value.target.value)}>
          {productTypes.map(productType => (
            <option key={productType} value={productType}>{d(productType)}</option>
          ))}
        </Select>

        <Flex direction='column' hidden={selectedType !== 'shoes'} gap={2}>
          <Flex alignItems="center" gap={2}>
            <Select {...register('season')} placeholder={d('season')} isRequired maxW={200}>
              {seasons.map(season => (
                <option key={season} value={season}>{ds(season)}</option>
              ))}
            </Select>
            <Select {...register('color')} placeholder={d('color')} isRequired maxW={200}>
              {colors.map(color => (
                <option key={color} value={color}>{dc(color)}</option>
              ))}
            </Select>
          </Flex>

          <Sizes sizes={shoes} onAddSize={onAddSize} onChangeSize={onChangeSize} onDeleteSize={onDeleteSize}/>
        </Flex>


        <Flex direction='row' alignItems='center' gap={2} justifyContent='space-between' pt={30}>
          <Flex pt={4} alignItems="center">
            <Button mr={3} variant='green' type='submit' isLoading={isLoading}>{dict.save}</Button>
            <Button onClick={router.back}>{dict.cancel}</Button>
          </Flex>
          <Box>
            {isEditing && (
              <AlertDeleteDialog onDelete={onDelete} bodyText='' headerText={dict.del} variant='big'
                                 isLoading={isLoading}/>
            )}
          </Box>
        </Flex>

      </Flex>
    </form>
  )
}

export default ProductForm