import React from 'react';
import {Badge, Box} from "@chakra-ui/react";
import {getColorScheme} from "./functions";
import {OrderStatusType} from "./types";
import {useTranslations} from "next-intl";

interface Props {
  status: OrderStatusType
}


const Status = ({status}: Props) => {
  const t = useTranslations('status')
  const colorScheme = getColorScheme(status)
  return (
    <Box>
      <Badge colorScheme={colorScheme} variant='solid'>
        {t(status)}
      </Badge>
    </Box>

  );
};

export default Status;