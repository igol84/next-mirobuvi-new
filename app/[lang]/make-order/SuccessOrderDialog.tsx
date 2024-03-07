import React, {useContext} from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {LangContext} from "@/locale/LangProvider";
import {useRouter} from "next/navigation";

interface Props {
  isOpen: boolean
  isAuthorized: boolean
}

const SuccessOrderDialog = ({isOpen, isAuthorized}: Props) => {
  const d = useDictionaryTranslate("orderForm")
  const lang = useContext(LangContext)
  const router = useRouter()
  const onClose = () => {
    if(isAuthorized){
      router.push(`/${lang}/profile/orders-list`)
    } else {
      router.push(`/${lang}`)
    }
  }
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>{d('dialogSuccessHeader')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text fontWeight='bold' mb='1rem'>
            {d('dialogSuccessBody1')}<br/>
            {d('dialogSuccessBody2')}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessOrderDialog;