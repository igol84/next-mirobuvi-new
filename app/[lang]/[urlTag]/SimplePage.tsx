'use client'
import React, {useEffect} from 'react';
import {Box} from "@chakra-ui/react";
import {useSearchParams} from "next/navigation";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {ProductType} from "@/components/Products/types";

interface Props {
  children?: React.ReactNode
  desc: string
  breadCrumbs: BreadCrumbData[]
  viewedProducts: ProductType[]
}

const SimplePage = ({children = undefined, desc, breadCrumbs, viewedProducts}: Props) => {
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])
  return (
    <Box>
      <Box display='flex' justifyContent='space-between' flexWrap='wrap' alignItems="center" pb={[2, 4]}>
        <BreadCrumb breadCrumbs={breadCrumbs}/>
      </Box>
      {children}
      <div className='desc' dangerouslySetInnerHTML={{__html: desc}}/>
      {viewedProducts.length > 0 && (
        <Box pt={4}>
          <ViewedProducts viewedProducts={viewedProducts}/>
        </Box>
      )}
    </Box>
  );
};

export default SimplePage;