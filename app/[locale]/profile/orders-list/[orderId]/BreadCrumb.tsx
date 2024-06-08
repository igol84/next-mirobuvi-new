import React from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";
import NextLink from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n";

const BreadCrumb = ({text}: { text: string }) => {
  const t = useTranslations('orderList')
  const locale = useLocale() as Locale
  return (
    <Breadcrumb pb={[2, 4]} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
      <BreadcrumbItem>
        <BreadcrumbLink display='flex' alignItems='center' as={NextLink} href={`/${locale}/profile/orders-list`}>
          {t('orders')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>{text}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadCrumb;