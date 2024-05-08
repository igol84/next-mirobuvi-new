import Sizes from "@/components/product/admin/shoes/Sizes";
import React, {useState} from "react";
import {SizeType} from "@/components/product/admin/shoes/types";
import {Flex, IconButton} from "@chakra-ui/react";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import {waitSecond} from "@/utility/functions";
import {serverActionSizeEdit} from "@/components/product/actions";

interface Props {
  shoesId: number
  defaultSizes: SizeType[]
  onClose: () => void
}

const SizesEditForm = ({shoesId, defaultSizes, onClose}: Props) => {
  const [sizes, setSizes] = useState<SizeType[]>(defaultSizes)
  const [loading, setLoading] = useState<boolean>(false)
  const onAddSize = () => {
    if (sizes.length > 0) {
      const lastSIze = sizes[sizes.length - 1] as SizeType
      const newSize: SizeType = {
        size: lastSIze.size + 1,
        isAvailable: lastSIze.isAvailable,
        length: lastSIze.length + 0.5
      }
      setSizes(sizes => [...sizes, newSize])
    } else {
      setSizes([{size: 36, isAvailable: true, length: 23.5}])
    }
  }

  const onChangeSize = (oldSize: SizeType, newSize: SizeType) => {
    setSizes(sizes => sizes.map(size => {
      if (size === oldSize)
        return newSize
      return size
    }))
  }
  const onDeleteSize = (delSize: SizeType) => {
    setSizes(sizes => sizes.filter(size => size !== delSize))
  }
  const onClickClose = () => {
    onClose()
  }
  const onSubmit = async () => {
    setLoading(true)
    await serverActionSizeEdit(shoesId, sizes)
    await waitSecond()
    setLoading(false)
    onClose()
  }

  return (
    <Flex direction='column' alignItems='start' gap={4}>
      <Sizes sizes={sizes} onAddSize={onAddSize} onChangeSize={onChangeSize} onDeleteSize={onDeleteSize}/>
      <Flex gap={2}>
        <IconButton
          isRound={true}
          variant='outline'
          aria-label='Done'
          fontSize='20px'
          icon={<CheckIcon/>}
          onClick={onSubmit}
          isLoading={loading}
        />
        <IconButton
          isRound={true}
          variant='outline'
          aria-label='Done'
          fontSize='20px'
          icon={<CloseIcon/>}
          onClick={onClickClose}
          isLoading={loading}
        />
      </Flex>

    </Flex>
  )
}

export default SizesEditForm