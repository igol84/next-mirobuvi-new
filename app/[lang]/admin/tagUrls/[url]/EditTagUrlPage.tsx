'use client'
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {useRouter} from "next/navigation";
import {Box, Button} from "@chakra-ui/react";
import {AiOutlineRollback} from "react-icons/ai";
import FormEditor from "@/components/tagUrls/admin/FormEditor";

import React from "react";
import {TagUrlsFormSchema} from "@/components/tagUrls/admin/types";


interface EditTagUrlPageProps {
  defaultValues: TagUrlsFormSchema,
  parents: string[]
}

const EditTagUrlPage = ({defaultValues, parents}: EditTagUrlPageProps) => {
  const d = useDictionaryTranslate("global")
  const router = useRouter()
  return (
    <Box>
      <Button variant='ghost' colorScheme='white' onClick={router.back} leftIcon={<AiOutlineRollback/>}>
        {d('back')}
      </Button>
      <FormEditor defaultValues={defaultValues} parents={parents}/>
    </Box>
  )
}

export default EditTagUrlPage