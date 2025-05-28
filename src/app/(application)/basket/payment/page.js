"use client";

import Stepper from "@/component/ui/Stepper";
import { CreditCard, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();

  const handlePay = async () => {
    try {
      const res = await fetch("https://researchback.onrender.com/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 10000,
          description: "خرید تستی از فروشگاه",
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(
          `پرداخت ناموفق بود: ${
            data?.message || data?.error || "خطای ناشناخته"
          }`
        );
        console.error("❌ Server error:", data);
      }
    } catch (err) {
      alert("خطا در برقراری ارتباط با سرور");
      console.error("❌ Fetch error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5 sm:p-10">
      <Stepper currentStep={3} />
      <div className="max-w-xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#00A693] mb-4">
          آماده‌ی پرداخت هستید؟
        </h2>
        <p className="text-gray-600 mb-8 text-base sm:text-lg">
          مبلغ قابل پرداخت:{" "}
          <span className="font-semibold text-black">10,000 تومان</span>
          <br />
          با کلیک روی دکمه زیر، به درگاه بانکی متصل خواهید شد
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handlePay}
            className="flex items-center justify-center gap-2 bg-[#00A693] hover:bg-[#008b7a] transition-all duration-300 text-white px-6 py-3 rounded-xl text-lg shadow-md w-full sm:w-auto"
          >
            <CreditCard className="w-5 h-5" />
            پرداخت امن
          </button>

          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-300 px-6 py-3 rounded-xl text-base w-full sm:w-auto"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}
