import {Box, Flex, IconButton, Link, Text, WrapItem} from "@chakra-ui/react";
import {SimilarProduct} from "@/components/product/types";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import React from "react";
import NextLink from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";
import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react";
import {MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";

interface Props {
  products: SimilarProduct[];
}

const GroupOfLikeProducts = ({products}: Props) => {
  const locale = useLocale() as Locale
  const t = useTranslations("product")
  if(products.length===0) return undefined
  return (
    <Box>
      <Text>{t('similarProducts')}:</Text>
      <Flex pt={4} w='100%' alignItems='center' gap={2}>
        <IconButton fontSize={['16', '24', '24', '44']} icon={<MdArrowBackIosNew/>} aria-label='prev'
                    className='review-swiper-button-prev-like-products'/>
        <Box width={['68%', '80%', '85%', '88%', '95%', '98%']}>
          <Swiper
            slidesPerView={4}
            spaceBetween={8}
            breakpoints={{
              640: {
                slidesPerView: 8,
              },
              768: {
                slidesPerView: 9,
              },
              990: {
                slidesPerView: 8,
              },
              992: {
                slidesPerView: 5,
              },
              1440: {
                slidesPerView: 7,
              },
              1500: {
                slidesPerView: 9,
              },
              2500: {
                slidesPerView: 10,
              },
            }}
            navigation={{
              nextEl: '.review-swiper-button-next-like-products',
              prevEl: '.review-swiper-button-prev-like-products',
            }}
            modules={[Navigation]}
            className="group-of-like-products-swiper"
          >
            {products.map((product) => (
              <WrapItem key={product.url}>
                <SwiperSlide className="group-of-like-products-swiper" key={product.url}>
                  <Link key={product.url} as={NextLink} href={`/${locale}/products/${product.url}`}
                        _hover={{color: 'hoverLinkTextColor'}}>
                    <ChakraNextImage
                      borderRadius={10} as={NextImage} width={49} height={49} alt={product.name}
                      src={product.urlImage}
                    />
                  </Link>
                </SwiperSlide>
              </WrapItem>
            ))}
          </Swiper>
        </Box>
        <IconButton fontSize={['16', '24', '24', '44']} icon={<MdArrowForwardIos/>} aria-label='next'
                    className='review-swiper-button-next-like-products'/>
      </Flex>
    </Box>
  )
}

export default GroupOfLikeProducts