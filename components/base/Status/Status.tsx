import React from 'react';
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {Badge, Box} from "@chakra-ui/react";
import {getColorScheme} from "./functions";
import {OrderStatusType} from "./types";

interface Props {
  status: OrderStatusType
}


const Status = ({status}: Props) => {
  const d = useDictionaryTranslate("status")
  const colorScheme = getColorScheme(status)
  return (
    <Box>
      <Badge colorScheme={colorScheme} variant='solid'>
        {d(status)}
      </Badge>
    </Box>

  );
};

export default Status;