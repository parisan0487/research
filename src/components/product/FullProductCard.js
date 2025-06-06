"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Truck, ShieldCheck, RefreshCw, Wallet } from "lucide-react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";

export default function FullProduct() {
  const [product, setProduct] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const params = useParams();
  const slug = params.id;

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const response = await Fetch.get(`/api/products/${slug}`);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {}
    };

    fetchProduct();
  }, [slug]);


  const addToCart = async () => {
    try {
      const response = await Fetch.post(
        "/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          token: true,
        }
      );
      toast.success("محصول با موفقیت به سبد خرید اضافه شد");
    } catch (err) {
      toast.error("خطا در افزودن محصول به سبد خرید");
    }
  };


  useEffect(() => {
    if (!product || !product.categories) return;

    const fetchRelated = async () => {
      try {
        const response = await Fetch.get(`/api/products/category/${product.categories[0]}`);
        if (response.status === 200) {
          // محصول فعلی رو حذف می‌کنیم از لیست مرتبط‌ها (تا خودش نمایش داده نشه)
          const filtered = response.data.filter((p) => p._id !== product._id);
          setRelatedProducts(filtered);
        }
      } catch (error) {}
    };

    fetchRelated();
  }, [product]);

  return (
    <div dir="rtl">
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-10 bg-white rounded-3xl shadow-md">
        <div className="w-full lg:w-1/3 h-[25rem] rounded-2xl overflow-hidden shadow-md flex flex-col p-2 bg-white">
          {/* تصویر اصلی */}
          <div className="relative group overflow-hidden rounded-xl h-[75%] shadow-sm">
            {product?.images && (
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </div>

          {product?.images?.length > 1 ? (
            <div className="flex gap-2 justify-center h-[13%] mt-6">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-16 h-16 rounded border-2 ${selectedImageIndex === i
                    ? "border-green-500"
                    : "border-transparent"
                    } overflow-hidden`}
                >
                  <Image
                    src={img}
                    alt={`تصویر ${i + 1}`}
                    width={64}
                    height={64}
                    className="w-full  object-cover"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="" />
          )}
        </div>

        <div className="w-full lg:w-2/3 bg-gray-100 p-6 rounded-2xl shadow-inner flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 flex flex-col gap-6 justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#007F5F]">
                {product?.name}
              </h1>

              <span className=" w-46 h-0.5 bg-gray-300 mt-2"></span>

              <div className="flex items-center gap-3 text-gray-500 text-sm mt-1">
                <span>محصولات جانبی</span>
              </div>

              <h3 className="text-[#007F5F] font-bold text-lg mt-4 mb-2">
                توضیحات محصول
              </h3>

              <ul className="list-disc pr-4 text-gray-700 space-y-1 text-sm leading-relaxed">
                {Array.isArray(product?.feature) ? (
                  product.feature.map((line, i) => <li key={i}>{line}</li>)
                ) : (
                  <li>{product?.feature}</li>
                )}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-gray-200 p-5 rounded-2xl shadow-inner border border-gray-300 flex flex-col justify-between">
            <div>
              <div className="text-center text-[#007F5F] font-bold text-sm mb-4">
                فروشنده
              </div>

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  ارسال توسط فروشگاه
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gray-500" />
                  گارانتی اصالت و سلامت فیزیکی کالا
                </li>
                <li className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                  ضمانت تعویض کالا
                </li>
                <li className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-gray-500" />
                  هزینه حمل به عهده خریدار
                </li>
              </ul>

              <div className="flex justify-between items-center mt-6 mb-2">
                <del className="text-gray-400 text-sm">
                  {product?.discount?.toLocaleString()} تومان
                </del>
                <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-lg">
                  15%
                </span>
              </div>

              <div className="text-xl font-bold text-[#007F5F] mb-4">
                {product?.price?.toLocaleString()} تومان
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full bg-[#00B386] hover:bg-[#009C73] text-white font-semibold py-2 rounded-xl transition"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-200 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-[#007F5F] mb-4">
          توضیحات کامل محصول
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm">
          {product?.description ||
            "توضیحات تکمیلی این محصول هنوز اضافه نشده است"}
        </p>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12 relative w-full md:h-[40rem] h-[40rem] rounded-xl overflow-hidden">
          <h2 className="sm:text-xl font-bold text-[#007F5F] mb-6 flex items-center gap-2 whitespace-nowrap flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="0.3"
              className="size-12 text-[#44e4d1]"
              viewBox="0 0 44 44"
              fill="currentColor"
            >
              <path d="M42.0122 26.5954C41.8932 26.3573 41.5955 26.2383 41.3574 26.1788C39.9884 26.1788 28.2026 25.7026 28.2026 12.012C28.2026 11.5953 27.8454 11.2382 27.4288 11.2382C27.0121 11.2382 26.655 11.5953 26.655 12.012C26.655 25.7026 14.8692 26.1788 13.5596 26.1788C13.381 26.1788 13.2025 26.2383 13.0834 26.3573C12.9644 26.4169 12.9049 26.5359 12.8453 26.5954C12.7263 26.8335 12.7263 27.1312 12.8453 27.3692C12.9644 27.6073 13.262 27.7859 13.5596 27.7859H13.6191C14.9882 27.7859 26.7145 28.2621 26.7145 41.9527C26.7145 42.3694 27.0716 42.7265 27.4883 42.7265C27.905 42.7265 28.2621 42.3694 28.2621 41.9527C28.2621 28.3216 39.9884 27.7859 41.3574 27.7859C41.6551 27.7859 41.8932 27.6073 42.0717 27.3692C42.1908 27.1312 42.1908 26.8335 42.0122 26.5954ZM27.4288 36.1193C25.7026 30.4645 21.4763 28.024 18.143 26.9526C21.4763 25.8811 25.7026 23.4407 27.4288 17.7858C29.155 23.4407 33.3812 25.8811 36.7146 26.9526C33.3812 28.024 29.155 30.4645 27.4288 36.1193ZM17.6073 11.1191C18.0239 11.1191 18.3811 10.762 18.3811 10.2858C18.3811 9.86912 18.0239 9.51197 17.6073 9.51197C16.893 9.51197 10.4644 9.27387 10.4644 1.77382C10.4644 1.35715 10.1072 1 9.69054 1C9.27387 1 8.91673 1.35715 8.91673 1.77382C8.91673 9.27387 2.48811 9.51197 1.77382 9.51197H1.71429C1.29762 9.5715 1 9.86912 1 10.2858C1 10.7025 1.35715 11.0596 1.77382 11.0596C2.54763 11.0596 8.91673 11.2977 8.91673 18.7978C8.91673 19.2144 9.27387 19.5716 9.69054 19.5716C10.0477 19.6311 10.4048 19.274 10.4048 18.8573C10.4048 11.3572 16.8335 11.1191 17.5477 11.1191H17.6073ZM9.63102 14.512C8.67863 12.2501 6.95243 11.0001 5.34527 10.2858C7.07147 9.57149 8.67863 8.20244 9.63102 6.05956C10.5834 8.32148 12.3096 9.57149 13.9168 10.2858C12.1906 11.0001 10.5834 12.3691 9.63102 14.512Z" />
            </svg>
            محصولات مرتبط
          </h2>

          <div className=" bg-[#44e4d1] p-16 px-3 rounded-2xl bg-[url(/assets/img/Vector-3.svg)] bg-fixed">
            <div className="flex flex-wrap justify-center items-center content-center">
              <div className="w-[90%] md:w-full max-w-7xl mx-auto ">
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
                  {relatedProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
