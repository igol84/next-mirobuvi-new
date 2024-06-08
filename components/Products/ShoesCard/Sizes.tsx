import React from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

type Props = {
  sizes: number[]
}

const Sizes = ({sizes}: Props) => {
  const t = useTranslations('shoes')
  return (
    <Flex gap='4px 8px' wrap='wrap' justifyContent='center'>
      <Text color='green.300'>{t('sizes')}</Text>
      {sizes.map(size => {
        return (
          <Text key={size}>{size}</Text>
        )
      })}
    </Flex>
  );
};

export default Sizes;