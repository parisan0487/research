"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../../shared/ProductCard";

const Offer = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 49,
  });

  // Countdown logic
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(countdown);
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="relative py-10 w-full md:h-[40rem] h-[31rem] mt-16 rounded-xl overflow-hidden bg-[url(/assets/img/offer-1.jpg)] bg-no-repeat bg-top-right">
      <div className="flex flex-wrap justify-center items-center content-center">
        {/*  */}

        <div className="flex items-center justify-between w-full mb-6 px-4">
          <div className="flex items-center gap-2 text-center">
            {[
              { label: "ساعت", value: timeLeft.hours },
              { label: "دقیقه", value: timeLeft.minutes },
              { label: "ثانیه", value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-yellow-400 w-12 h-12 rounded-2xl flex flex-col justify-center items-center border-2 border-white md:border-none"
              >
                <span className="text-black text-base font-bold leading-none">
                  {item.value.toString().padStart(2, "0")}
                </span>
                <span className="text-white text-[10px] leading-none">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 whitespace-nowrap flex-shrink-0">
            پیشنهاد ویژه
            <svg
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="0.3"
              className="size-12 text-white"
              viewBox="0 0 44 44"
              fill="currentColor"
            >
              <path d="M42.0122 26.5954C41.8932 26.3573 41.5955 26.2383 41.3574 26.1788C39.9884 26.1788 28.2026 25.7026 28.2026 12.012C28.2026 11.5953 27.8454 11.2382 27.4288 11.2382C27.0121 11.2382 26.655 11.5953 26.655 12.012C26.655 25.7026 14.8692 26.1788 13.5596 26.1788C13.381 26.1788 13.2025 26.2383 13.0834 26.3573C12.9644 26.4169 12.9049 26.5359 12.8453 26.5954C12.7263 26.8335 12.7263 27.1312 12.8453 27.3692C12.9644 27.6073 13.262 27.7859 13.5596 27.7859H13.6191C14.9882 27.7859 26.7145 28.2621 26.7145 41.9527C26.7145 42.3694 27.0716 42.7265 27.4883 42.7265C27.905 42.7265 28.2621 42.3694 28.2621 41.9527C28.2621 28.3216 39.9884 27.7859 41.3574 27.7859C41.6551 27.7859 41.8932 27.6073 42.0717 27.3692C42.1908 27.1312 42.1908 26.8335 42.0122 26.5954ZM27.4288 36.1193C25.7026 30.4645 21.4763 28.024 18.143 26.9526C21.4763 25.8811 25.7026 23.4407 27.4288 17.7858C29.155 23.4407 33.3812 25.8811 36.7146 26.9526C33.3812 28.024 29.155 30.4645 27.4288 36.1193ZM17.6073 11.1191C18.0239 11.1191 18.3811 10.762 18.3811 10.2858C18.3811 9.86912 18.0239 9.51197 17.6073 9.51197C16.893 9.51197 10.4644 9.27387 10.4644 1.77382C10.4644 1.35715 10.1072 1 9.69054 1C9.27387 1 8.91673 1.35715 8.91673 1.77382C8.91673 9.27387 2.48811 9.51197 1.77382 9.51197H1.71429C1.29762 9.5715 1 9.86912 1 10.2858C1 10.7025 1.35715 11.0596 1.77382 11.0596C2.54763 11.0596 8.91673 11.2977 8.91673 18.7978C8.91673 19.2144 9.27387 19.5716 9.69054 19.5716C10.0477 19.6311 10.4048 19.274 10.4048 18.8573C10.4048 11.3572 16.8335 11.1191 17.5477 11.1191H17.6073ZM9.63102 14.512C8.67863 12.2501 6.95243 11.0001 5.34527 10.2858C7.07147 9.57149 8.67863 8.20244 9.63102 6.05956C10.5834 8.32148 12.3096 9.57149 13.9168 10.2858C12.1906 11.0001 10.5834 12.3691 9.63102 14.512Z" />
            </svg>
          </h2>
        </div>

        {/*  */}
        <div className="md:flex absolute left-0 bottom-24 z-2 hidden">
          <Image
            src="/assets/img/art-vector.png"
            alt="لوگو"
            width={130}
            height={130}
          />
        </div>

        {/*  */}

        <div className="w-[90%] md:w-full max-w-7xl mx-auto px-3">
          <Swiper
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
            }}
            modules={[Navigation, Autoplay]}
            className="overflow-visible"
            style={{ overflow: "visible" }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Offer;
