import React, {useTransition} from 'react';
import {TiPlus} from "react-icons/ti";
import {IconButton} from "@chakra-ui/react";
import {incrementProductQuantity} from "@/lib/action";

interface Props {
  productId: string
  size?: number | null
}

const ButtonPlus = ({productId, size}: Props) => {
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(async () => {
      await incrementProductQuantity(productId, size)
    })
  }
  return (
    <IconButton isLoading={isPending} onClick={onClick} variant={'cart'} aria-label='Plus' size='sm'
                icon={<TiPlus/>}/>
  );
};

export default ButtonPlus;