import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

interface Props{
  children: React.ReactNode
  isOpen: boolean
  onClose: ()=>void
}

const DrawerMenu = ({children, isOpen, onClose}: Props) => {
  const t = useTranslations('global')
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerCloseButton/>
        <DrawerHeader></DrawerHeader>

        <DrawerBody>
          {children}
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            {t('close')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;