'use client'
import {AiOutlineRollback} from "react-icons/ai";
import {Box, Button} from "@chakra-ui/react";
import React from "react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {useRouter} from "next/navigation";
import FormEditor from "@/components/tagUrls/admin/FormEditor";
import {defaultValues} from "@/components/tagUrls/admin/types";

const AddPage = () => {
  const d = useDictionaryTranslate("global")
  const router = useRouter()
  return (
    <Box>
      <Button variant='ghost' colorScheme='white' onClick={router.back} leftIcon={<AiOutlineRollback/>}>
        {d('back')}
      </Button>
      <FormEditor defaultValues={defaultValues}/>
    </Box>
  )
}

export default AddPage