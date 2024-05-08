import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from "@chakra-ui/react";
import React, {useState} from "react";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import {waitSecond} from "@/utility/functions";
import {serverActionPriceEdit} from "@/components/product/actions";

interface Props {
  id: number,
  defaultPrice: number,
  onClose: () => void
}

const PriceEditor = ({id, defaultPrice, onClose}: Props) => {
  const [price, setPrice] = useState<number>(defaultPrice)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async () => {
    if(price != defaultPrice) {
      setLoading(true)
      await serverActionPriceEdit(id, price)
      await waitSecond()
      setLoading(false)
    }
    onClose()
  }

  const onClickClose = () => {
    onClose()
  }

  return (
    <Flex gap={4} py={4}>
      <NumberInput value={price} onChange={(_: string, value: number) => setPrice(value)} min={0} step={100}
                   isDisabled={loading}>
        <NumberInputField/>
        <NumberInputStepper>
          <NumberIncrementStepper/>
          <NumberDecrementStepper/>
        </NumberInputStepper>
      </NumberInput>
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
  )
}

export default PriceEditor