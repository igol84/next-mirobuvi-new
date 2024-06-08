import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import {AiFillDelete} from "react-icons/ai";
import {useTranslations} from "next-intl";

interface Props {
  variant?: 'sm' | 'big',
  headerText?: string,
  bodyText?: string,
  onDelete: () => void,
  isLoading?: boolean
}

const AlertDeleteDialog = ({onDelete, headerText = '', bodyText = '', variant = 'sm', isLoading}: Props) => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const onClickDelete = () => {
    onClose()
    onDelete()
  }
  const cancelRef = React.useRef(null)
  const t = useTranslations('global')

  return (
    <>
      {variant === 'sm'
        ? (
          <IconButton aria-label={headerText} variant='link' color={'red.600'} onClick={onOpen} icon={<AiFillDelete/>}/>
        )
        : (
          <Button variant='solid' bgColor={'red.600'} colorScheme='red' onClick={onOpen} leftIcon={<AiFillDelete/>}>
            {t('delete')}
          </Button>
        )
      }


      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {headerText}
            </AlertDialogHeader>

            <AlertDialogBody>
              {bodyText}
            </AlertDialogBody>

            <AlertDialogFooter gap={2}>
              <Button variant='red' onClick={onClickDelete} isLoading={isLoading}>
                {t('delete')}
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                {t('cancel')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
};

export default AlertDeleteDialog;