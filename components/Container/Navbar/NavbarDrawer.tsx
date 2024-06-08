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
import React from "react";
import Navbar from "@/components/Container/Navbar/index";
import {Item} from "@/components/Container/Navbar/types";
import {TagUrl} from "@/app/[locale]/[urlTag]/types";
import {useTranslations} from "next-intl";

type Props = {
  isOpen: boolean,
  onClose: () => void
  brandsItems: Item[]
  tagsUrl: TagUrl[]
}

const DrawerMenu = ({isOpen, onClose, brandsItems, tagsUrl}: Props) => {
  const btnRef = React.useRef(null)
  const t = useTranslations('home')
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader>{t('menu')}</DrawerHeader>

          <DrawerBody>
            <Navbar brandsItems={brandsItems} isMobile={true} onClose={onClose} tagsUrl={tagsUrl}/>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              {t('close')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerMenu