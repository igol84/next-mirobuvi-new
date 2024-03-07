import React, {useTransition} from 'react';
import {TiMinus} from "react-icons/ti";
import {IconButton} from "@chakra-ui/react";
import {decrementProductQuantity} from "@/lib/action";

interface Props {
  productId: string
  size?: number | null
}

const ButtonMinus = ({productId, size}: Props) => {
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(async () => {
      await decrementProductQuantity(productId, size)
    })
  }
  return (
    <IconButton isLoading={isPending} onClick={onClick} variant={'cart'} aria-label='Minus' size='sm'
                icon={<TiMinus/>}/>
  );
};

export default ButtonMinus;