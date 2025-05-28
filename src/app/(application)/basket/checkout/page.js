import Stepper from "@/component/ui/Stepper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Checkout() {
  return (
    <div className="p-10">
      <Stepper currentStep={2} />
      <div className="min-h-screen overflow-hidden">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-4xl  bg-white rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1  gap-6 p-6 sm:p-10">
              <div>
                <h2 className="text-2xl font-semibold text-[#00A693] mb-6 text-center">
                  جزئیات صورت‌حساب
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    placeholder="نام خانوادگی"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end"
                  />
                  <input
                    placeholder="نام"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end"
                  />
                  <input
                    placeholder="شهر"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end"
                  />
                  <input
                    placeholder="استان"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end"
                  />
                  <input
                    placeholder="آدرس خیابان"
                    className="sm:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end"
                  />
                  <input
                    placeholder="کدپستی"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end"
                  />
                  <input
                    placeholder="تلفن"
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end"
                  />
                  <textarea
                    placeholder="توضیحات سفارش (اختیاری)"
                    className="sm:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none resize-none h-32 text-end"
                  ></textarea>
                </div>
                <Link href="/basket/payment">
                  <button className="mt-8 w-full bg-[#00A693] text-white p-3 rounded-lg hover:bg-[#008B7A] transition-all duration-300 text-lg">
                    ثبت سفارش
                  </button>
                </Link>
              </div>

              <Link href="/basket">
                <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-300 px-6 py-3 rounded-xl text-base w-full sm:w-auto">
                  <ArrowRight className="w-4 h-4" />
                  بازگشت
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
