'use client'
import {ProductType} from "@/components/product/types";
import {ProductType as CardProductType} from "@/components/Products/types";
import {productFactory} from "@/components/product/ProductFactory";
import React from "react";
import {Box, Flex, Heading} from "@chakra-ui/react";
import '@/app/theme/style.scss'
import Gallery from "@/components/product/Galarey";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";
import {saveViewedProducts} from "@/app/[locale]/products/[productUrl]/functions";
import ViewedProducts from "@/components/Container/ViewedProducts";
import NewIcon from "@/app/[locale]/products/[productUrl]/NewIcon";


type Props = {
  productData: ProductType
  breadCrumbData: BreadCrumbData[]
  viewedProducts: CardProductType[]
}
const ProductPage = ({productData, breadCrumbData, viewedProducts}: Props) => {
  const product = productFactory(productData)
  saveViewedProducts(productData.url)
  return (
    <>
      <Box display='flex' justifyContent='space-between' flexWrap='wrap' alignItems="center" pb={[2, 4]}>
        <BreadCrumb breadCrumbs={breadCrumbData}/>
      </Box>
      <Flex flexDirection={{base: 'column', lg: 'row'}} pb={8}>
        <Box w={{base: '100%', lg: '60%'}} position='relative'>
          <NewIcon hidden={!productData.isNew}/>
          <Gallery images={productData.images}/>
        </Box>
        <Box w={{base: '100%', lg: '38%'}}>
          {product}
        </Box>
      </Flex>
      <Box className='desc'>
        <header>
          <Heading as='h1'>{productData.name}</Heading>
        </header>
        <section>
          <div dangerouslySetInnerHTML={{__html: productData.desc}}/>
        </section>
      </Box>
      {viewedProducts.length > 0 && (
        <Box pt={4}>
          <ViewedProducts viewedProducts={viewedProducts}/>
        </Box>
      )}
    </>
  )
};

export default ProductPage;