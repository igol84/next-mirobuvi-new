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
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  variant?: 'sm' | 'big'
  headerText: string
  bodyText: string
  onDelete: () => void
}

const AlertDeleteDialog = ({onDelete, headerText, bodyText, variant = 'sm'}: Props) => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const onClickDelete = () => {
    onClose()
    onDelete()
  }
  const cancelRef = React.useRef(null)
  const d = useDictionaryTranslate("orderForm")
  return (
    <>
      {variant === 'sm'
        ? (
          <IconButton aria-label={headerText} variant='link' color={'red.600'} onClick={onOpen} icon={<AiFillDelete/>}/>
        )
        : (
          <Button variant='solid' bgColor={'red.600'} colorScheme='red' onClick={onOpen} leftIcon={<AiFillDelete/>}>
            {d('delete')}
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

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {d('cancel')}
              </Button>
              <Button colorScheme='red' onClick={onClickDelete} ml={3}>
                {d('delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
};

export default AlertDeleteDialog;