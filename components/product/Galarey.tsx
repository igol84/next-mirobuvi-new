'use client'
import React, {CSSProperties, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as TypeSwiper} from 'swiper';
import {FreeMode, Navigation, Thumbs, Zoom as SZoom} from 'swiper/modules';
import {Box, Flex} from "@chakra-ui/react";
import NextImage from "next/image";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import {Controlled as ControlledZoom} from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


type Props = {
  images: string[]
}

export default function Gallery({images}: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<TypeSwiper | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean[]>(images.map(_ => false))

  const onZoomed = (index: number, value: boolean) => {
    const isZoomed = images.map(_ => false)
    isZoomed[index] = value
    setIsZoomed(isZoomed)
  }

  return (
    <Flex gap={2}>
      <Box w='10%'>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, SZoom]}
          className="ProductThumb"
          zoom={true}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <ChakraNextImage as={NextImage} src={image} alt={'image'} width={0} height={0} sizes="100vw"
                               style={{width: '100%', height: 'auto'}} priority={index === 0}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box w='86%'>
        <Swiper
          style={{
            '--swiper-pagination-color': '#10aec4',
          } as CSSProperties}
          spaceBetween={10}
          navigation={true}
          thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
          modules={[FreeMode, Navigation, Thumbs]}
          className="ProductSwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <ControlledZoom isZoomed={isZoomed[index]} onZoomChange={(value)=>onZoomed(index, value)}>
                <ChakraNextImage
                  as={NextImage} src={image} alt={'image'} width={0} height={0} sizes="100vw"
                  style={{width: '100%', height: 'auto'}} priority={true}
                />
              </ControlledZoom>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
}
