import React from 'react';
import {allGenders, FilterGender, FilterGenderType} from "@/app/[lang]/[urlTag]/types";
import {Wrap} from "@chakra-ui/react";
import GenderItem from "@/components/Container/FilterMenu/ShoesMenu/Gender/GenderItem";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

export type GenderType = {
  filterGenderType: FilterGenderType
  onClick: (gender: FilterGender) => void
}

interface Props {
  genderType: GenderType
  onMobileMenuClose?: () => void
}

const Gender = ({genderType: {filterGenderType: {selectedGender, genders}, onClick}}: Props) => {
  const d = useDictionaryTranslate("filterGender")
  return (
    <Wrap>
      {allGenders.map(gender => {
        const selected = gender === selectedGender
        const active = genders.includes(gender)
        return <GenderItem key={gender} gender={gender} label={d(gender)} selected={selected} active={active}
                           onClick={onClick}/>
      })}
    </Wrap>
  )
}

export default Gender;