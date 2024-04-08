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
import {BrandFormSchema, defaultValues, schema} from "@/components/Brands/admin/types";
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
  const onFormSubmit: SubmitHandler<BrandFormSchema> = async (formData) => {
    const response = await serverActionCreateNeBrand(formData)
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
      onClose()
      reset()
    }
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
                  <FormLabel>{d('nameUa')}</FormLabel>
                  <Input {...register('nameUa')} placeholder={d('nameUa')}/>
                  {errors.nameUa && (
                    <FormErrorMessage>{d('nameUa')} {d(errors.nameUa.message!)}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.nameEn} isRequired>
                  <FormLabel>{d('nameEn')}</FormLabel>
                  <Input {...register('nameEn')} placeholder={d('nameEn')}/>
                  {errors.nameEn && (
                    <FormErrorMessage>{d('nameEn')} {d(errors.nameEn.message!)}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>


              <Flex alignItems="center" gap={2}>
                <FormControl isInvalid={!!errors.titleUa} isRequired>
                  <FormLabel>{d('titleUa')}</FormLabel>
                  <Input {...register('titleUa')} placeholder={d('titleUa')}/>
                  {errors.titleUa && (
                    <FormErrorMessage>{d('titleUa')} {d(errors.titleUa.message!)}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.titleEn} isRequired>
                  <FormLabel>{d('titleEn')}</FormLabel>
                  <Input {...register('titleEn')} placeholder={d('titleEn')}/>
                  {errors.titleEn && (
                    <FormErrorMessage>{d('titleEn')} {d(errors.titleEn.message!)}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>

              <Flex alignItems="center" gap={2}>
                <FormControl isInvalid={!!errors.metaDescUa}>
                  <FormLabel>{d('metaDescUa')}</FormLabel>
                  <Input {...register('metaDescUa')} placeholder={d('metaDescUa')}/>
                  {errors.metaDescUa && (
                    <FormErrorMessage>{d('metaDescUa')} {d(errors.metaDescUa.message!)}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.metaDescEn}>
                  <FormLabel>{d('metaDescEn')}</FormLabel>
                  <Input {...register('metaDescEn')} placeholder={d('metaDescEn')}/>
                  {errors.metaDescEn && (
                    <FormErrorMessage>{d('metaDescEn')} {d(errors.metaDescEn.message!)}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>

              <Flex alignItems="center" gap={2}>
                <FormControl isInvalid={!!errors.tags}>
                  <FormLabel>{d('tags')}</FormLabel>
                  <Input {...register('tags')} placeholder={d('tags')}/>
                  {errors.tags && (
                    <FormErrorMessage>{d('tags')} {d(errors.tags.message!)}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>

              <Flex alignItems="center" gap={2}>
                <FormControl isInvalid={!!errors.url}>
                  <FormLabel>{d('url')}</FormLabel>
                  <Input {...register('url')} placeholder={d('url')}/>
                  {errors.url && (
                    <FormErrorMessage>{d('url')} {d(errors.url.message!)}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>

              <Flex alignItems="center" gap={2}>
                <FormControl isInvalid={!!errors.textUa}>
                  <FormLabel>{d('textUa')}</FormLabel>
                  <Textarea {...register('textUa')} placeholder={d('textUa')}/>
                  {errors.textUa && (
                    <FormErrorMessage>{d('textUa')} {d(errors.textUa.message!)}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>

              <Flex alignItems="center" gap={2}>
                <FormControl isInvalid={!!errors.textEn}>
                  <FormLabel>{d('textEn')}</FormLabel>
                  <Textarea {...register('textEn')} placeholder={d('textEn')}/>
                  {errors.textEn && (
                    <FormErrorMessage>{d('textEn')} {d(errors.textEn.message!)}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>


              <Flex alignItems="center" gap={2}>
                <Checkbox {...register('active')}>Active</Checkbox>
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