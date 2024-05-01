import {Link, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface Props {
  pageUrl: string
  pageName: string
  isCurrentPage: boolean
}

const CustomLink = ({pageUrl, pageName, isCurrentPage}: Props) => {
  return isCurrentPage
    ? <Text textDecorationLine='underline'>{pageName}</Text>
    : <Link as={NextLink} href={pageUrl}>{pageName}</Link>
}

export default CustomLink