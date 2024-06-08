'use client'

import {ArticleFormSchema, schema} from "@/components/Articles/admin/types";
import {useDict} from "@/components/Articles/admin/hooks";
import {useRouter} from "next/navigation";
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
  Heading,
  Input,
  Text,
  Textarea
} from "@chakra-ui/react";
import AlertDeleteDialog from "@/components/base/AlertDeleteDialog";
import {convertTextForUrl} from "@/utility/functions";
import {serverActionCreateOrEditArticle, serverActionDeleteArticle} from "@/app/[locale]/articles/actions";


type Props = {
  defaultValues: ArticleFormSchema,
  urlList: string[],
}

const ArticleForm = ({defaultValues, urlList}: Props) => {
  const isEditing = defaultValues.selectedUrl !== null
  const {dict, d} = useDict()
  const router = useRouter()
  const {
    register, handleSubmit, setError,
    formState: {errors, isSubmitting},
  } = useForm<ArticleFormSchema>({
    defaultValues,
    resolver: zodResolver(schema)
  })
  const onFormSubmit: SubmitHandler<ArticleFormSchema> = async (data) => {
    const url = convertTextForUrl(data.url)
    const urlIsConsist = urlList.includes(url)
    if (urlIsConsist) {
      setError('url', {
        type: 'server',
        message: 'consist'
      })
    } else {
      const response = await serverActionCreateOrEditArticle({...data, url})
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
  const headingText = isEditing ? dict.editArticle : dict.addNewArticle
  const [idDeleting, setIsDeleting] = useState<boolean>(false)
  const isLoading = isSubmitting || idDeleting
  const onDelete = isEditing
    ? async () => {
      setIsDeleting(true)
      const url = defaultValues.selectedUrl as string
      await serverActionDeleteArticle(url)
      setIsDeleting(false)
      router.back()
    }
    : () => undefined
  return (
    <Flex direction="column" gap={2} justify="space-between">
      <Heading as='h1'>{headingText}</Heading>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input type="hidden" {...register('selectedUrl')}/>
        <Flex direction='column' gap={2}>
          <Flex alignItems="center" gap={2}>

            <FormControl isInvalid={!!errors.url} isRequired>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>URL</Text>
                <Input {...register('url')} placeholder={'URL'}/>
                {errors.url && (
                  <FormErrorMessage>URL {dict[errors.url.message! as 'consist' | 'gt2']}</FormErrorMessage>
                )}
              </Flex>
            </FormControl>

            <FormControl isInvalid={!!errors.img} isRequired>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{dict.img}</Text>
                <Input {...register('img')} placeholder={dict.img}/>
                {errors.img && (
                  <FormErrorMessage>{dict.img} {dict.gt2}</FormErrorMessage>
                )}
              </Flex>
            </FormControl>
            <Checkbox {...register('active')}>{d('active')}</Checkbox>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <FormControl isInvalid={!!errors.titleUa} isRequired>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{dict.titleUa}</Text>
                <Input {...register('titleUa')} placeholder={dict.titleUa}/>
                {errors.titleUa && (
                  <FormErrorMessage>{dict.titleUa} {dict.gt2}</FormErrorMessage>
                )}
              </Flex>
            </FormControl>

            <FormControl isInvalid={!!errors.titleEn} isRequired>
              <Flex direction='row' alignItems='center' gap={2}>
                <Text>{dict.titleEn}</Text>
                <Input {...register('titleEn')} placeholder={dict.titleEn}/>
                {errors.titleEn && (
                  <FormErrorMessage>{dict.titleEn} {dict.gt2}</FormErrorMessage>
                )}
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

        </Flex>
        <Flex direction='row' alignItems='center' gap={2} justifyContent='space-between'>
          <Flex pt={4}>
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
      </form>
    </Flex>
  )
}

export default ArticleForm