import React from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

type Props = {
  sizes: number[]
}

const Sizes = ({sizes}: Props) => {
  const d = useDictionaryTranslate("shoes")
  return (
    <Flex gap='4px 8px' wrap='wrap' justifyContent='center'>
      <Text color='green.300'>{d('sizes')}</Text>
      {sizes.map(size => {
        return (
          <Text key={size}>{size}</Text>
        )
      })}
    </Flex>
  );
};

export default Sizes;