"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Truck, ShieldCheck, RefreshCw, Wallet, Star } from "lucide-react";

export default function FullProduct() {
  const [product, setProduct] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setProduct({
      id: "ghand_fenjan_01",
      name: "ست میناکاری قندان و فنجان",
      price: 1320000,
      originalPrice: 1540000,
      discount: 14,
      images: [
        "/assets/img/product4.webp",
        "/assets/img/product4.webp",
        "/assets/img/product4.webp",
      ],
      description: [
        "جنس بدنه چوب حصیر",
        "مقاوم در برابر ضربه و فشار",
        "توانایی حمل اجسام سنگین",
        "نوع حصیر مات",
        "بافت منسجم و مستحکم",
      ],
    });
  }, []);

  return (
    <div
      dir="rtl"
      className="flex flex-col md:flex-row gap-6 p-4 md:p-10 bg-white rounded-3xl shadow-md"
    >
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
                className={`w-16 h-16 rounded border-2 ${
                  selectedImageIndex === i
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
              {product?.description?.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
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
                {product?.originalPrice?.toLocaleString()} تومان
              </del>
              <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-lg">
                {product?.discount}%
              </span>
            </div>

            <div className="text-xl font-bold text-[#007F5F] mb-4">
              {product?.price?.toLocaleString()} تومان
            </div>
          </div>

          <button className="w-full bg-[#00B386] hover:bg-[#009C73] text-white font-semibold py-2 rounded-xl transition">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}
