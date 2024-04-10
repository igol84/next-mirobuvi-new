import {useAddNewBrand} from "@/components/Brands/admin/hooks";
import {Box, IconButton} from "@chakra-ui/react";
import AddNewBrandModal from "@/components/Brands/admin/AddNewBrandModal";
import React from "react";
import {AddIcon} from "@chakra-ui/icons";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const AddNewBrand = () => {
  const d = useDictionaryTranslate("brandsAdmin")
  const dict = {
    'addBrand': d('addBrand'),
  }
  const {onClickAddBrand, isModalAddBrandOpen, onModalAddBrandClose} = useAddNewBrand()
  return (
    <Box pb={2}>
      <IconButton aria-label={dict.addBrand} onClick={onClickAddBrand} icon={<AddIcon/>}/>
      <AddNewBrandModal isOpen={isModalAddBrandOpen} onClose={onModalAddBrandClose}/>
    </Box>
  )
}

export default AddNewBrand