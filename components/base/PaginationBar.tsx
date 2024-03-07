import React from 'react';
import {Button, ButtonGroup, IconButton} from "@chakra-ui/react";
import _ from "lodash";
import {usePathname, useSearchParams} from "next/navigation";
import {BiFirstPage, BiLastPage} from "react-icons/bi";
import NextLink from "next/link";
import {createUrl} from "@/lib/format";

export interface PaginationBarProps {
  currentPage: number
  totalPages: number
}


const PaginationBar = ({currentPage, totalPages}: PaginationBarProps) => {
  const pageSize = 2
  const searchParams = useSearchParams()
  const pathname = usePathname()
  let params = new URLSearchParams(searchParams.toString())
  const maxPage = Math.min(totalPages, Math.max(currentPage + pageSize, pageSize));
  const minPage = Math.max(1, Math.min(currentPage - pageSize, maxPage - pageSize - 1));
  const pagesArray = _.range(minPage, maxPage + 1)
  const isFirstPage = currentPage === 1
  const variantFirstPage = isFirstPage ? "Selected" : ""
  const isLastPage = currentPage === totalPages
  const variantLastPage = isLastPage ? "Selected" : ""
  params.delete('page')
  const firstHref = createUrl(pathname, params.toString())
  params.set('page', totalPages.toString())
  const lastHref = createUrl(pathname, params.toString())
  if (totalPages <= 1) return null
  return (
    <ButtonGroup isAttached boxShadow='2xl'>
      <IconButton as={NextLink} aria-label='First Page' icon={<BiFirstPage/>} variant={'pagination' + variantFirstPage}
                  href={firstHref}/>
      {pagesArray.map(page => {
        const isCurrentPage = currentPage === page
        const variant = isCurrentPage ? "Selected" : ""
        params.set('page', page.toString())
        const href = createUrl(pathname, params.toString())
        return (
          <Button key={page} as={NextLink} href={href} variant={'pagination' + variant}>
            {page}
          </Button>
        )
      })}
      <IconButton as={NextLink} aria-label='Last Page' icon={<BiLastPage/>} variant={'pagination' + variantLastPage}
                  href={lastHref}/>
    </ButtonGroup>
  );
};

export default PaginationBar;