import {
  Checkbox,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack
} from "@chakra-ui/react";
import {SizeType} from "@/components/product/admin/shoes/types";
import React, {ChangeEvent} from "react";
import AlertDeleteDialog from "@/components/base/AlertDeleteDialog";


interface Props {
  size: SizeType,
  onChangeSize: (oldSize: SizeType, newSize: SizeType) => void,
  onDeleteSize: (delSize: SizeType) => void
}


const Size = ({size, onChangeSize, onDeleteSize}: Props) => {
  const onSizeChang = (_: string, numberValue: number) => {
    onChangeSize(size, {...size, size: numberValue})
  }
  const onLengthChang = (_: string, numberValue: number) => {
    onChangeSize(size, {...size, length: numberValue})
  }
  const onAvailableChang = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    onChangeSize(size, {...size, isAvailable: value})
  }
  const onDelete = () => {
    onDeleteSize(size)
  }
  return (
    <VStack>
      <AlertDeleteDialog onDelete={onDelete}/>
      <NumberInput value={size.size} onChange={onSizeChang} min={0} width={88} step={1}>
        <NumberInputField/>
        <NumberInputStepper>
          <NumberIncrementStepper/>
          <NumberDecrementStepper/>
        </NumberInputStepper>
      </NumberInput>

      <Checkbox defaultChecked={size.isAvailable} onChange={onAvailableChang}/>

      <NumberInput value={size.length} onChange={onLengthChang} min={0} width={88} step={0.5}>
        <NumberInputField/>
        <NumberInputStepper>
          <NumberIncrementStepper/>
          <NumberDecrementStepper/>
        </NumberInputStepper>
      </NumberInput>

    </VStack>
  )
}

export default Size