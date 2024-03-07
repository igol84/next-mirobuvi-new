'use client'
import {ProductType} from "@/components/product/types";
import {ProductType as CardProductType} from "@/components/Products/types";
import {productFactory} from "@/components/product/ProductFactory";
import React, {useEffect} from "react";
import {Box, Flex, Heading} from "@chakra-ui/react";
import Gallery from "@/components/product/Galarey";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";
import {saveViewedProducts} from "@/app/[lang]/products/[productUrl]/functions";
import ViewedProducts from "@/components/Container/ViewedProducts";
import NewIcon from "@/app/[lang]/products/[productUrl]/NewIcon";
import NextImage from "next/image";
import ChakraNextImage from "@/components/base/ChakraNextImage";

type Props = {
  productData: ProductType
  breadCrumbData: BreadCrumbData[]
  viewedProducts: CardProductType[]
}
const IMAGES = ['03', '13', '23', '33']
const ProductPage = ({productData, breadCrumbData, viewedProducts}: Props) => {
  const product = productFactory(productData)
  const images = productData.images.filter(url => IMAGES.some(name => url.includes(name)))
  const bigImage = productData.images.find(url => url.includes('/4.jpg'))
  useEffect(() => {
    window.scrollTo(0, 0)
    saveViewedProducts(productData.product_key)
  }, [productData.product_key])
  return (
    <>
      <Box display='flex' justifyContent='space-between' flexWrap='wrap' alignItems="center" pb={[2, 4]}>
        <BreadCrumb breadCrumbs={breadCrumbData}/>
      </Box>
      <Flex flexDirection={{base: 'column', lg: 'row'}} pb={8}>
        <Box w={{base: '100%', lg: '60%'}} position='relative'>
          <NewIcon hidden={!productData.isNew}/>
          <Gallery images={images}/>
        </Box>
        <Box w={{base: '100%', lg: '38%'}}>
          {product}
        </Box>
      </Flex>
      <Heading>{productData.name}</Heading>
      <div className='desc' dangerouslySetInnerHTML={{__html: productData.desc}}/>
      {!!bigImage && (
        <ChakraNextImage as={NextImage} src={bigImage} alt={'big image'} width={0} height={0} sizes="100vw"
                         style={{width: '100%', maxWidth: '590px', height: 'auto'}}/>
      )}

      {viewedProducts.length > 0 && (
        <Box pt={4}>
          <ViewedProducts viewedProducts={viewedProducts}/>
        </Box>
      )}
    </>
  )
};

export default ProductPage;