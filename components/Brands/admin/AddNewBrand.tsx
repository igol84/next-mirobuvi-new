import {useAddNewBrand} from "@/components/Brands/admin/hooks";
import {Box, Button} from "@chakra-ui/react";
import AddNewBrandModal from "@/components/Brands/admin/AddNewBrandModal";
import React from "react";

const AddNewBrand = () => {
  const {onClickAddBrand, isModalAddBrandOpen, onModalAddBrandClose} = useAddNewBrand()
  return (
    <Box pb={2}>
      <Button onClick={onClickAddBrand}>Add</Button>
      <AddNewBrandModal isOpen={isModalAddBrandOpen} onClose={onModalAddBrandClose}/>
    </Box>
  )
}

export default AddNewBrand