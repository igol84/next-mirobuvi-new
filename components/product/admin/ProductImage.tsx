import NextImage from "next/image";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import React from "react";
import {Box, Text} from "@chakra-ui/react";
import {Reorder} from "framer-motion";

export type Image = {
  name: string,
  url: string
}

interface Props {
  image: Image,
  onDragEnd: () => void
}

const ProductImage = ({image, onDragEnd}: Props) => {
  return (
    <Reorder.Item value={image} id={image.name} as='div' onDragEnd={onDragEnd}>
      <Box cursor='pointer'>
        <Text>{image.name}</Text>
        <ChakraNextImage
          as={NextImage} src={image.url} shadow='base' borderRadius={5} pointerEvents={"none"}
          width={49} height={49} alt={image.name} draggable={false}
        />
      </Box>
    </Reorder.Item>
  )
}

export default ProductImage