'use client'
import React from 'react';
import '@/app/theme/style.scss'
import {Box, Flex, Heading} from "@chakra-ui/react";
import Carousel from "@/components/Carousel";
import Brands from "@/components/Brands";
import {BrandCardPropsWithFirst} from "@/components/Brands/types";

type Props = {
  brands: BrandCardPropsWithFirst[],
  desc: string,
  header: string
}

const Home = ({brands, desc, header}: Props) => {
  return (
    <>
      <Flex justifyContent='center' alignItems='center' pb={8}>
        <Box w={[200, 400, 570]}>
          <Carousel/>
        </Box>
      </Flex>
      <Brands brands={brands}/>
      <header>
        <Heading as='h1'>{header}</Heading>
      </header>
      <section>
        <div className='desc' dangerouslySetInnerHTML={{__html: desc}}/>
      </section>
    </>
  );
};

export default Home;