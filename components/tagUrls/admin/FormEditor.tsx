import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper, Select,
  Text,
  Textarea
} from "@chakra-ui/react";
import {schema, TagUrlsFormSchema} from "@/components/tagUrls/admin/types";
import {useDict} from "@/components/tagUrls/admin/hooks";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import AlertDeleteDialog from "@/components/base/AlertDeleteDialog";
import {useRouter} from "next/navigation";
import {serverActionDeleteTagUrl, serverActionTagUrl} from "@/app/[lang]/admin/tagUrls/add/actions";

interface Props {
  defaultValues: TagUrlsFormSchema,
  parents: string[]
}

const FormEditor = ({defaultValues, parents}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const isEditing = !!defaultValues.selectedUrl
  const {dict, d} = useDict()
  const router = useRouter()
  const headingText = isEditing ? dict.editTag : dict.addNewTag
  const {
    register, handleSubmit, setError, control,
    formState: {errors, isSubmitting},
  } = useForm<TagUrlsFormSchema>({
    defaultValues,
    resolver: zodResolver(schema)
  })
  const onFormSubmit: SubmitHandler<TagUrlsFormSchema> = async (data) => {
    const response = await serverActionTagUrl(data)
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
  const isLoading = isSubmitting || isDeleting
  const onDelete = isEditing
    ? async () => {
      setIsDeleting(true)
      await serverActionDeleteTagUrl(defaultValues.selectedUrl!)
      setIsDeleting(false)
      router.back()
    }
    : () => undefined
  return (
    <Flex direction='column' gap={2}>
      <Heading as='h1'>{headingText}</Heading>
      <Text color='tomato'>{errors.descUa?.message}</Text>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input {...register('selectedUrl')} type="hidden"/>
        <Flex direction='column' gap={2}>
          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.url} isRequired>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{dict.url}</Text>
                <Input {...register('url')} placeholder={dict.url}/>
                {errors.url && (
                  <FormErrorMessage>{dict.url} {dict[errors.url.message as keyof typeof dict]}</FormErrorMessage>
                )}
              </Flex>
            </FormControl>
            <Select {...register('parent')} maxW={200}>
              {parents.map(parent => (
                <option key={parent} value={parent}>{parent}</option>
              ))}
            </Select>
            <FormControl isInvalid={!!errors.orderNumber} isRequired>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{d('orderNumber')}</Text>
                <Controller
                  control={control}
                  name={'orderNumber'}
                  defaultValue={defaultValues.orderNumber}
                  render={({field: {onChange, value}}) => (
                    <NumberInput onChange={(_: string, value: number) => onChange(value)} value={value} min={0}>
                      <NumberInputField/>
                      <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />

              </Flex>
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.searchEn}>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{d('searchEn')}</Text>
                <Input {...register('searchEn')} placeholder={d('searchEn')}/>
              </Flex>
            </FormControl>

            <FormControl isInvalid={!!errors.searchUa}>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{d('searchUa')}</Text>
                <Input {...register('searchUa')} placeholder={d('searchUa')}/>
              </Flex>
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.titleEn}>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{d('titleEn')}</Text>
                <Input {...register('titleEn')} placeholder={d('titleEn')}/>
              </Flex>
            </FormControl>

            <FormControl isInvalid={!!errors.titleUa}>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{d('titleUa')}</Text>
                <Input {...register('titleUa')} placeholder={d('titleUa')}/>
              </Flex>
            </FormControl>
          </Flex>

          <FormControl isInvalid={!!errors.descEn}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{d('descEn')}</Text>
              <Input {...register('descEn')} placeholder={d('descEn')}/>
            </Flex>
          </FormControl>

          <FormControl isInvalid={!!errors.descUa}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{d('descUa')}</Text>
              <Input {...register('descUa')} placeholder={d('descUa')}/>
            </Flex>
          </FormControl>

          <FormControl isInvalid={!!errors.textEn}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{d('textEn')}</Text>
              <Textarea {...register('textEn')} placeholder={d('textEn')}/>
            </Flex>
          </FormControl>

          <FormControl isInvalid={!!errors.textUa}>
            <Flex direction='row' alignItems='center' gap={2}>
              <Text>{d('textUa')}</Text>
              <Textarea {...register('textUa')} placeholder={d('textUa')}/>
            </Flex>
          </FormControl>

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
    </Flex>
  )
}

export default FormEditor