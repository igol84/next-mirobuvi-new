import React from 'react';
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
import {useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n";

interface Props {
  isOpen: boolean
  isAuthorized: boolean
}

const SuccessOrderDialog = ({isOpen, isAuthorized}: Props) => {
  const t = useTranslations('orderForm')
  const locale = useLocale() as Locale
  const router = useRouter()
  const onClose = () => {
    if (isAuthorized) {
      router.push(`/${locale}/profile/orders-list`)
    } else {
      router.push(`/${locale}`)
    }
  }
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>{t('dialogSuccessHeader')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text fontWeight='bold' mb='1rem'>
            {t('dialogSuccessBody1')}<br/>
            {t('dialogSuccessBody2')}
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