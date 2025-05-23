"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const imagePaths = [
  "/assets/img/b1.jpg",
  "/assets/img/b4.jpg",
  "/assets/img/b3.webp",
  "/assets/img/b2.jpg",
  "/assets/img/b5.jpg",
];

const Header = () => {
  return (
    <div className="w-full h-[500px] mt-5 rounded-2xl overflow-hidden">
      <Swiper
        direction="vertical"
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        className="w-full h-full"
      >
        {imagePaths.map((src, i) => (
          <SwiperSlide key={i} className="relative w-full h-full">
            <Image
              src={src}
              alt={`اسلاید ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Header;
