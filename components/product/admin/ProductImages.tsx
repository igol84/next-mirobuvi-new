import ProductImage, {Image} from "@/components/product/admin/ProductImage";
import React, {useState} from "react";
import {Reorder} from "framer-motion"
import {Flex} from "@chakra-ui/react";
import _ from "lodash";

interface ProductImagesProps {
  images: Image[]
  headerRenameImages: (names: string[]) => Promise<Image[]>
}


const ProductImages = ({images, headerRenameImages}: ProductImagesProps) => {
  const [items, setItems] = useState<Image[]>(images)
  const hasOrderBeenChanged = () => !_.isEqual(images, items)
  const onDragEnd = async () => {
    if (hasOrderBeenChanged()) {
      const newImages = await headerRenameImages(items.map(item => item.name))
      setItems(newImages)
    }
  }
  return (
    <Reorder.Group values={items} onReorder={setItems} axis='x' as={'div'}>
      <Flex gap={1}>
        {items.map(item => <ProductImage key={item.url} image={item} onDragEnd={onDragEnd}/>)}
      </Flex>
    </Reorder.Group>
  )
}

export default ProductImages