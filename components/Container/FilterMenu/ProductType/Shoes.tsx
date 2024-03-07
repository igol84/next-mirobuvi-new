import React from 'react';
import {Box, Checkbox} from "@chakra-ui/react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  isChecked: boolean
  onChange:(checked: boolean) => void
}
const Shoes = ({isChecked, onChange}: Props) => {
  const d = useDictionaryTranslate("filter")
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }
  return (
    <Box>
      <Checkbox defaultChecked={isChecked} onChange={onChangeValue}>{d('shoes')}</Checkbox>
    </Box>
  );
};

export default Shoes;