import React from 'react';
import {allGenders, FilterGender, FilterGenderType} from "@/app/[locale]/[urlTag]/types";
import {Wrap} from "@chakra-ui/react";
import GenderItem from "@/components/Container/FilterMenu/ShoesMenu/Gender/GenderItem";
import {useTranslations} from "next-intl";

export type GenderType = {
  filterGenderType: FilterGenderType
  onClick: (gender: FilterGender) => void
}

interface Props {
  genderType: GenderType
  onMobileMenuClose?: () => void
}

const Gender = ({genderType: {filterGenderType: {selectedGender, genders}, onClick}}: Props) => {
  const t = useTranslations('filterGender')
  return (
    <Wrap>
      {allGenders.map(gender => {
        const selected = gender === selectedGender
        const active = genders.includes(gender)
        return <GenderItem key={gender} gender={gender} label={t(gender)} selected={selected} active={active}
                           onClick={onClick}/>
      })}
    </Wrap>
  )
}

export default Gender;