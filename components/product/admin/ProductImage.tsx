import NextImage from "next/image";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import React from "react";
import {Box, Text} from "@chakra-ui/react";
import {Reorder} from "framer-motion";
import AlertDeleteDialog from "@/components/base/AlertDeleteDialog";

export type Image = {
  name: string,
  url: string
}

interface Props {
  image: Image,
  onDragEnd: () => void
  onDelete: (name: string) => void
}

const ProductImage = ({image, onDragEnd, onDelete}: Props) => {
  return (
    <Reorder.Item value={image} id={image.name} as='div' onDragEnd={onDragEnd}>
      <AlertDeleteDialog onDelete={() => onDelete(image.name)}/>
      <Box cursor='pointer'>
        <ChakraNextImage
          as={NextImage} src={image.url} shadow='base' borderRadius={5} pointerEvents={"none"}
          width={49} height={49} alt={image.name} draggable={false}
        />
      <Text>{image.name}</Text>
      </Box>
    </Reorder.Item>
  )
}

export default ProductImage