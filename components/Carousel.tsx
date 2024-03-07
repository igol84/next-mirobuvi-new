'use client'
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Image, Link} from "@chakra-ui/react";
import NextLink from "next/link";



const CarouselComponent = () => {
  const slides = [
    {
      img: "https://mirobuvi.com.ua/images/slide/Adidas_Nite_Jogger_Black_Black.jpg?1691342023491",
      label: "First Slide",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      img: "https://mirobuvi.com.ua/images/slide/slide-6.jpg",
      label: "Second Slide",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://mirobuvi.com.ua/images/slide/slide-4.jpg",
      label: "Third Slide",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    }
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((sled, index) => {
          return (
            <SwiperSlide key={index}>
              <Link as={NextLink} href={`/`}>
              <Image src={sled.img} alt='Imajes shous'/>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  );
};

export default CarouselComponent;