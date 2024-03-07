import React, {useContext} from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";
import NextLink from "next/link";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {LangContext} from "@/locale/LangProvider";

const BreadCrumb = ({text}: { text: string }) => {
  const d = useDictionaryTranslate("orderList")
  const lang = useContext(LangContext)
  return (
    <Breadcrumb pb={[2, 4]} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
      <BreadcrumbItem>
        <BreadcrumbLink display='flex' alignItems='center' as={NextLink} href={`/${lang}/profile/orders-list`}>
          {d('orders')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>{text}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadCrumb;