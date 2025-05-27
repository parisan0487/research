import Stepper from "@/component/ui/Stepper";
import Link from "next/link";

export default function Checkout() {
  return (
    <div>
      <Stepper currentStep={2} />
      <div className="min-h-screen overflow-hidden p-5">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-4xl shadow-xl bg-white rounded-2xl overflow-hidden">
            <div className="md:grid-cols-2 gap-6 p-10">
              <div>
                <h2 className="text-2xl font-semibold text-[#00A693] mb-6 text-center">
                  جزئیات صورت‌حساب
                </h2>
                <div className="grid grid-cols-2 gap-6">
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
                    className="col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end"
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
                    className="col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none resize-none h-32 text-end"
                  ></textarea>
                </div>
                <Link href="/basket/payment">
                  <button className="mt-8 w-full bg-[#00A693] text-white p-3 rounded-lg hover:bg-[#008B7A] transition-all duration-300 text-lg">
                    ثبت سفارش
                  </button>
                </Link>
              </div>
              <Link href="/basket">
                <button className="mt-8 text-end bg-[#44e4d1] text-white p-3 rounded-lg hover:bg-[#00A693] transition-all duration-300 text-lg">
                  برگشتن به سبد خرید
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
