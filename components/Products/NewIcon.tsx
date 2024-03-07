import React from 'react';
import {Badge} from "@chakra-ui/react";

interface Props{
  hidden: boolean
}

const NewIcon = ({hidden}: Props) => {
  return (
    <Badge display={!hidden ? 'block' : 'none'} colorScheme='green' variant='solid' position='absolute' left={3}
           top={4} pointerEvents="none">
      new
    </Badge>
  );
};

export default NewIcon;