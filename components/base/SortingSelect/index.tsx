'use client'
import React, {useState} from 'react';
import {Box, Flex, Select, Text} from "@chakra-ui/react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {createUrl} from "@/lib/format";
import {Sorting, SortingProps, SortingType} from "@/components/base/SortingSelect/types";


const SortingSelect = ({value}: SortingProps) => {
  const [selectedValue, setSelectedValue] = useState(value)
  const d = useDictionaryTranslate("sortingForm")
  const searchParams = useSearchParams()
  const pathname = usePathname()
  let params = new URLSearchParams(searchParams.toString())
  const stringValues = Object.values(Sorting).filter((v) => isNaN(Number(v)))
  const router = useRouter()
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingBy = event.target.value as SortingType
    setSelectedValue(sortingBy)
    params.set('sortingBy', sortingBy)
    params.delete('page')
    const url = createUrl(pathname, params.toString())
    router.push(url)
  }
  return (
    <Flex gap={1} alignItems="center">
      <Box whiteSpace='nowrap'>
        <Text>{d('sortingBy')}</Text>
      </Box>
      <Select value={selectedValue} size='sm' onChange={onChange} aria-label="Sorting By">
        {stringValues.map(value => (
          <option key={value} value={value}>{d(value as string)}</option>
        ))}
      </Select>
    </Flex>
  );
};

export default SortingSelect;