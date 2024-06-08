import React, {useEffect, useState} from 'react';
import {Button, Input, InputGroup, InputLeftElement, InputRightAddon, Spinner} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import {usePathname, useSearchParams} from "next/navigation";
import serverActionSearch from "@/components/Container/Navbar/SearchInput/actions";
import {searchData} from "@/components/Container/Navbar/SearchInput/types";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n";

const isProductsPage = (path: string): boolean => {
  return path.includes('products')
}

interface Props {
  onClose?: () => void
}

const SearchInput = ({onClose = () => undefined}: Props) => {
  const t = useTranslations('home')
  const locale = useLocale() as Locale
  const params = useSearchParams()
  const searchParams = params.get('search') ? params.get('search') as string : ''
  const [searchValue, setSearchValue] = useState(searchParams)
  const [loading, setLoading] = useState(false)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }
  const pathname = usePathname()
  useEffect(() => {
    if (!isProductsPage(pathname))
      setSearchValue('')
  }, [pathname])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchData: searchData = {search: searchValue, locale}
    setLoading(true)
    await serverActionSearch(searchData)
    onClose()
    setLoading(false)
  }

  return (
    <search>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            {loading ? <Spinner color="gray.600"/> : <Search2Icon color="gray.600"/>}
          </InputLeftElement>
          <Input name='search' value={searchValue} onChange={onChange} borderRadius={8} type="text"
                 placeholder={`${t('search')}...`} isDisabled={loading}/>
          <input name='lang' type='hidden' defaultValue={locale}/>
          <InputRightAddon p={0} border="none" borderEndRadius={8}>
            <Button type='submit'>
              {t('search')}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </form>
    </search>
  )
}

export default SearchInput;