import {
  Flex,
  Grid,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from "@chakra-ui/react";
import React, {useState} from "react";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import {waitSecond} from "@/utility/functions";
import {serverActionPriceEdit} from "@/components/product/actions";
import {useTranslations} from "next-intl";

interface Props {
  id: number,
  defaultPrice: number,
  defaultDiscount: number,
  onClose: () => void
}

const PriceEditor = ({id, defaultPrice, defaultDiscount, onClose}: Props) => {
  const t = useTranslations("productAdmin")
  const [price, setPrice] = useState<number>(defaultPrice)
  const [discount, setDiscount] = useState<number>(defaultDiscount)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async () => {
    if (price !== defaultPrice || discount !== defaultDiscount) {
      setLoading(true)
      await serverActionPriceEdit(id, price, discount)
      await waitSecond()
      setLoading(false)
    }
    onClose()
  }

  const onClickClose = () => {
    onClose()
  }

  return (
    <Flex direction='column' gap={4} py={4} flexWrap='wrap'>
      <Flex alignItems='center' gap={2}>
        <Grid templateColumns='1fr 4fr' gap={6} alignItems='center'>
          <Text>{t('price')}</Text>
          <NumberInput value={price} onChange={(_: string, value: number) => setPrice(value)} min={0} step={100}
                       isDisabled={loading}>
            <NumberInputField/>
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>

          <Text whiteSpace='nowrap'>{t('discount')}</Text>
          <NumberInput value={discount} onChange={(_: string, value: number) => setDiscount(value)} min={0} max={100}
                       isDisabled={loading}>
            <NumberInputField/>
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
        </Grid>
      </Flex>
      <Flex alignItems='center' gap={2}>
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

export default PriceEditor