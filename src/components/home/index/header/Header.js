"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="relative w-full h-[500px] mt-5 rounded-2xl overflow-hidden">
      <Image
        src="/assets/img/s2.webp"
        alt="هدر فروشگاه"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">
          فروشگاه صنایع دستی
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow-sm">
          مجموعه‌ای اصیل از هنر دست ایرانی، با عشق و دقت انتخاب‌شده برای شما
        </p>
        <Link href="/shop">
          <button className="bg-[#00a693] hover:bg-[#008d7d] transition duration-500 px-6 py-2 rounded-full text-sm font-medium">
            مشاهده محصولات
          </button>
        </Link>
      </div>
    </div>
  );
};


