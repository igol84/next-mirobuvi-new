'use client'
import React, {useContext} from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {LangContext} from "@/locale/LangProvider";
import {Icon} from "@chakra-ui/icons";
import {AiFillHome} from "react-icons/ai";

export interface BreadCrumbData {
  label: string
  href: string
}

interface Props {
  breadCrumbs: BreadCrumbData[]
}

const BreadCrumb = ({breadCrumbs}: Props) => {
  const lang = useContext(LangContext)
  return (
    <Breadcrumb whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>

      <BreadcrumbItem>
        <BreadcrumbLink display='flex' alignItems='center' as={NextLink} href={`/${lang}`}>
          <Icon as={AiFillHome} aria-label="Home"/>
        </BreadcrumbLink>
      </BreadcrumbItem>

      {breadCrumbs.map((breadCrumb, index) => {
        const isCurrent = index + 1 === breadCrumbs.length
        return (
          <BreadcrumbItem key={index} isCurrentPage={isCurrent}>
            {isCurrent
              ? <Text>{breadCrumb.label}</Text>
              : <BreadcrumbLink as={NextLink} href={breadCrumb.href}>{breadCrumb.label}</BreadcrumbLink>
            }
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  );
};

export default BreadCrumb;