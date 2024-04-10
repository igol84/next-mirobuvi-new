import {useDisclosure} from "@chakra-ui/react";

export const useModalFormBrand = () => {
  const disclosure = useDisclosure()
  const isModalBrandFormOpen = disclosure.isOpen
  const openModalBrandForm = disclosure.onOpen
  const closeModalBrandForm = disclosure.onClose
  return {isModalBrandFormOpen, openModalBrandForm, closeModalBrandForm}
}