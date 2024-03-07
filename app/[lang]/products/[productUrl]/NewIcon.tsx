import React from 'react';
import {Badge} from "@chakra-ui/react";

interface Props {
  hidden: boolean
}

const NewIcon = ({hidden}: Props) => {
  return (
    <Badge
      zIndex={9} display={!hidden ? 'block' : 'none'} fontSize='1em' colorScheme='green' variant='solid'
      position='absolute' left='15%' top='5%' pointerEvents="none"
    >
      new
    </Badge>
  );
};

export default NewIcon;