"use client"
import Breadcrumb from "@/components/ui/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: "درباره ما", href: "/about" },
        ]}
      />

      <div
        className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center bg-gradient-to-br from-[#44e4d1] to-[#56bbaf] rounded-3xl p-10 mt-6"
        dir="rtl"
      >
        {/* متن درباره ما */}
        <motion.div
          className="space-y-6 text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold">درباره فروشگاه صنایع دستی</h2>

          <p className="text-lg leading-8 font-light">
            ما با افتخار مجموعه‌ای از برترین آثار هنری دست‌ساز ایرانی را گردآوری کرده‌ایم تا پلی باشیم میان هنرمندان اصیل کشورمان و شما که به هنر و زیبایی علاقه‌مندید. در فروشگاه ما، هر قطعه داستانی دارد، ریشه‌ای در فرهنگ و عشقی در تار و پود خود.
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-[#00a693] hover:text-white hover:bg-[#008d7d] transition-colors duration-300 px-5 py-2.5 rounded-xl font-semibold"
          >
            بازدید از فروشگاه ما
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.5713 3.42859H6.857L3.50628 6.79171L8.42978 11.6974L3.69217 15.5605V20.5714H8.43942V11.707L17.1937 20.4295L20.5444 17.0666L11.6213 8.17584H20.5713V3.42859Z"
              />
            </motion.svg>
          </Link>
        </motion.div>

        {/* تصویر */}
        <motion.div
          className="hidden xl:flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/assets/img/carpet.png"
            alt="قالی ایرانی"
            width={360}
            height={500}
          />
        </motion.div>
      </div>
    </>
  );
}
