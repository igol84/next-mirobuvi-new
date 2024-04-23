import ProductImage, {Image} from "@/components/product/admin/ProductImage";
import React, {useState} from "react";
import {Reorder} from "framer-motion"
import {Flex} from "@chakra-ui/react";
import _ from "lodash";

interface ProductImagesProps {
  images: Image[]
  headerRenameImages: (names: string[]) => Promise<Image[]>
  headerDeleteImage: (name: string, names: string[]) => Promise<Image[] | null>
}


const ProductImages = ({images, headerRenameImages, headerDeleteImage}: ProductImagesProps) => {
  const [items, setItems] = useState<Image[]>(images)
  const hasOrderBeenChanged = () => !_.isEqual(images, items)
  const onDragEnd = async () => {
    if (hasOrderBeenChanged()) {
      const newImages = await headerRenameImages(items.map(item => item.name))
      setItems(newImages)
    }
  }
  const onDelete = async (imageName: string) => {
    const names = items.map(item => item.name)
    const newImages = await headerDeleteImage(imageName, names)
    if (newImages) {
      setItems(newImages)
    }
  }
  return (
    <Reorder.Group values={items} onReorder={setItems} axis='x' as={'div'}>
      <Flex gap={1}>
        {items.map(item => <ProductImage key={item.url} image={item} onDragEnd={onDragEnd} onDelete={onDelete}/>)}
      </Flex>
    </Reorder.Group>
  )
}

export default ProductImages