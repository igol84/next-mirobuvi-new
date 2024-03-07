import {Box, chakra} from "@chakra-ui/react";

const ScrollingBox = chakra(Box, {
  baseStyle: {
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'gray.300',
      borderRadius: '24px'
    },
    _dark: {
      '&::-webkit-scrollbar-thumb': {
        background: 'gray.500',
      },
    }
  }
});

export default ScrollingBox;