"use client";
import { useEffect } from "react";
import Stepper from "@/component/ui/Stepper";

export default function Payment() {
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
    <div className="min-h-screen p-10">
      <Stepper currentStep={3} />
      <div className="flex justify-center mt-10">
        <button
          onClick={handlePay}
          className="bg-[#00A693] hover:bg-[#008b7a] text-white px-6 py-3 rounded-xl text-lg"
        >
          پرداخت
        </button>
      </div>
    </div>
  );
}
