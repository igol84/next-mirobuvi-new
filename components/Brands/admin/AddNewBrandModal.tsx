import {
  Button,
  Checkbox,
  Flex,
  FormControl,
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
import {useRef} from "react";
import {serverActionCreateNeBrand} from "@/app/[lang]/brands/actions";

type Props = {
  isOpen: boolean,
  onClose: () => void
}

const AddNewBrandModal = ({isOpen, onClose}: Props) => {
  const initialRef = useRef(null)
  const onFormSubmit = async (formData: FormData) => {
    await serverActionCreateNeBrand(formData)
    onClose()
  }
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='full'
           initialFocusRef={initialRef}>
      <ModalOverlay/>
      <ModalContent>
        <form action={onFormSubmit}>
          <ModalHeader>Create Brand</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}>

            <FormControl>
              <Flex direction='column' gap={2}>
                <Flex alignItems="center" gap={2}>
                  <FormLabel width='100px'>Name</FormLabel>
                  <Input name='nameUa' placeholder='Name Ua' ref={initialRef}/>
                  <Input name='nameEn' placeholder='Name En'/>
                </Flex>

                <Flex alignItems="center" gap={2}>
                  <FormLabel width='100px'>Title</FormLabel>
                  <Input name='titleUa' placeholder='Title Ua'/>
                  <Input name='titleEn' placeholder='Title En'/>
                </Flex>

                <Flex alignItems="center" gap={2}>
                  <FormLabel width='100px'>Tags</FormLabel>
                  <Input name='tags' placeholder='tags'/>
                </Flex>

                <Flex alignItems="center" gap={2}>
                  <FormLabel width='100px'>Meta Desc</FormLabel>
                  <Input name='metaDescUa' placeholder='Meta desc Ua'/>
                  <Input name='metaDescEn' placeholder='Meta desc En'/>
                </Flex>

                <Flex alignItems="center" gap={2}>
                  <FormLabel width={50}>URL</FormLabel>
                  <Input name='url' placeholder='URL'/>
                </Flex>

                <Flex alignItems="center" gap={2}>
                  <FormLabel width={50}>Text Ua</FormLabel>
                  <Textarea name='textUa' placeholder='Text'/>
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <FormLabel width={50}>Text En</FormLabel>
                  <Textarea name='textEn' placeholder='Text'/>
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <Checkbox name='active' isChecked={true}>Active</Checkbox>
                </Flex>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant='green' type='submit'>
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