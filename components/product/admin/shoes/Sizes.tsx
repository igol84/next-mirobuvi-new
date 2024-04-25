import {Flex, IconButton} from "@chakra-ui/react";
import Size from "@/components/product/admin/shoes/Size";
import {SizeType} from "@/components/product/admin/shoes/types";
import {AddIcon} from "@chakra-ui/icons";


interface Props {
  sizes: SizeType[],
  onAddSize: () => void,
  onChangeSize: (oldSize: SizeType, newSize: SizeType) => void,
  onDeleteSize: (delSize: SizeType) => void
}

const Sizes = ({sizes, onAddSize, onChangeSize, onDeleteSize}: Props) => {

  return (
    <Flex rowGap={8} columnGap={2} alignItems="center" wrap="wrap">
      <IconButton aria-label='add' icon={<AddIcon/>} onClick={onAddSize}/>
      {sizes.map((size, i) => <Size key={i} size={size} onChangeSize={onChangeSize} onDeleteSize={onDeleteSize}/>)}
    </Flex>
  )
}

export default Sizes