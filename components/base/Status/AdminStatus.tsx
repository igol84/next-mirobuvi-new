"use client"
import React, {useState} from 'react';
import {Badge, Box, Select} from "@chakra-ui/react";
import {getColorScheme} from "./functions";
import {allStatus, OrderStatusType, StatusProps} from "./types";
import {serverActionChangeOrderStatus} from "@/components/base/Status/actions";
import {useTranslations} from "next-intl";


const Status = ({orderId, status}: StatusProps) => {
  const t = useTranslations('status')
  const [isDisabled, setIsDisabled] = useState(true)
  const [viewStatus, setViewStatus] = useState<OrderStatusType>(status)
  const colorScheme = getColorScheme(viewStatus)
  const allStatusTranslated = new Map<OrderStatusType, string>()
  for (const status of allStatus) {
    allStatusTranslated.set(status, t(status))
  }
  const onClick = () => {
    setIsDisabled(false)
  }
  const onBlur = () => {
    setIsDisabled(true)
  }

  const handlerChangeStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value as OrderStatusType
    setViewStatus(selectedStatus)
    setIsDisabled(true)
    await serverActionChangeOrderStatus(orderId, selectedStatus)
  }

  return (
    <Box onClick={onClick} _hover={{cursor: 'pointer'}}>
      {isDisabled
        ? (
          <Badge colorScheme={colorScheme} variant='solid'>
            {t(viewStatus)}
          </Badge>
        ) : (
          <Select onBlur={onBlur} value={viewStatus} autoFocus={true} size='xs' onChange={handlerChangeStatus}>
            {allStatus.map(item => (
              <option key={item} value={item}>{allStatusTranslated.get(item)}</option>
            ))}
          </Select>
        )
      }
    </Box>
  );
};

export default Status;