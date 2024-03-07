import React from 'react';
import {Center} from "@chakra-ui/react";
import {FilterGender} from "@/app/[lang]/[urlTag]/types";


interface Props {
  gender: FilterGender
  label: string
  selected: boolean
  active: boolean
  onClick: (gender: FilterGender) => void
}

const GenderItem = ({gender, selected, label, active, onClick}: Props) => {
  const layerStyle = active ? selected ? 'shoesSizeSelected' : 'shoesSize' : 'shoesSizeEmpty'
  const onClickGender = () => {
    if(active)
      onClick(gender)
  }
  return (
    <Center onClick={onClickGender} layerStyle={layerStyle}>
      {label}
    </Center>
  );
};

export default GenderItem;