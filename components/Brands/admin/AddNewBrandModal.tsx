import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea
} from "@chakra-ui/react";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BrandFormSchema, defaultValues, NameBrandFormField, schema} from "@/components/Brands/admin/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {serverActionCreateNeBrand} from "@/app/[lang]/brands/actions";

type Props = {
  isOpen: boolean,
  onClose: () => void
}

const AddNewBrandModal = ({isOpen, onClose}: Props) => {
  const d = useDictionaryTranslate("brandsAdmin")

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<BrandFormSchema>({
    defaultValues,
    resolver: zodResolver(schema)
  })


  const onFormSubmit: SubmitHandler<BrandFormSchema> = async (data) => {
    const formData = new FormData()
    for (const key in data) {
      if (key === 'fileImg') {
        formData.append(key, data[key as NameBrandFormField][0])
      } else {
        formData.append(key, data[key as NameBrandFormField])
      }
    }
    const response = await serverActionCreateNeBrand(formData)
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
      onClose()
      reset()
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
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='full'>
      <ModalOverlay/>
      <ModalContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ModalHeader>Create Brand</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}>


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
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant='green' type='submit' isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddNewBrandModal