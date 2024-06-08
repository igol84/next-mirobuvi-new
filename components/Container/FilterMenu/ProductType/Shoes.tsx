import React from 'react';
import {Box, Checkbox} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

interface Props {
  isChecked: boolean
  onChange:(checked: boolean) => void
}
const Shoes = ({isChecked, onChange}: Props) => {
  const t = useTranslations('filter')
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }
  return (
    <Box>
      <Checkbox defaultChecked={isChecked} onChange={onChangeValue}>{t('shoes')}</Checkbox>
    </Box>
  );
};

export default Shoes;