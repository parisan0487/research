"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          فروشگاه صنایع دستی
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          مجموعه‌ای اصیل از هنر دست ایرانی، با عشق و دقت انتخاب‌شده برای شما
        </motion.p>

        <Link href="/shop">
          <motion.button
            className="bg-[#00a693] hover:bg-[#008d7d] transition duration-500 px-6 py-3.5 rounded-full text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            مشاهده محصولات
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
