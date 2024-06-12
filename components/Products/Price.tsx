import {Flex, Text} from "@chakra-ui/react";
import React from "react";


interface IProduct {
  price: number
  prefix: string
  isOld?: boolean
}

const Price = ({price, prefix, isOld = false}: IProduct) => {
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})

  const textDecorationLine = isOld ? 'line-through' : 'default'
  const fontWeight = isOld ? 'default' : 'bold'
  const color = isOld ? 'oldPrice' : 'price'
  return (
    <Flex alignItems='baseline' color={color}>
      <Text fontSize={24} fontWeight={fontWeight} textDecorationLine={textDecorationLine}>
        {UAHFormat.format(price)}
      </Text>
      <Text fontSize={16}>
        {prefix}
      </Text>
    </Flex>
  )
}

export default Price