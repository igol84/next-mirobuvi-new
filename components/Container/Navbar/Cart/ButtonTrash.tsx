import React, {useTransition} from 'react';
import {IconButton} from "@chakra-ui/react";
import {deleteProductQuantity} from "@/lib/action";
import {BsFillTrashFill} from "react-icons/bs";

interface Props {
  productId: string
  size?: number | null
}

const ButtonTrash = ({productId, size}: Props) => {
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(async () => {
      await deleteProductQuantity(productId, size)
    })
  }
  return (
    <IconButton isLoading={isPending} onClick={onClick} aria-label='Trash' size='sm'
                icon={<BsFillTrashFill/>}/>
  );
};

export default ButtonTrash;