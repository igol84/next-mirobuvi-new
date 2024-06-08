'use client'
import {AiOutlineRollback} from "react-icons/ai";
import {Box, Button} from "@chakra-ui/react";
import React from "react";
import {useRouter} from "next/navigation";
import FormEditor from "@/components/tagUrls/admin/FormEditor";
import {defaultValues} from "@/components/tagUrls/admin/types";
import {useTranslations} from "next-intl";

interface AddPageProps {
  parents: string[]
}

const AddPage = ({parents}: AddPageProps) => {
  const t = useTranslations('global')
  const router = useRouter()
  return (
    <Box>
      <Button variant='ghost' colorScheme='white' onClick={router.back} leftIcon={<AiOutlineRollback/>}>
        {t('back')}
      </Button>
      <FormEditor defaultValues={defaultValues} parents={parents}/>
    </Box>
  )
}

export default AddPage