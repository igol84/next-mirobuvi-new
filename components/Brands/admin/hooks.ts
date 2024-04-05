import {useDisclosure} from "@chakra-ui/react";

export const useAddNewBrand = () => {
  const disclosure = useDisclosure()
  const onClickAddBrand = disclosure.onOpen
  const isModalAddBrandOpen = disclosure.isOpen
  const onModalAddBrandClose = disclosure.onClose
  return {onClickAddBrand, isModalAddBrandOpen, onModalAddBrandClose}
}