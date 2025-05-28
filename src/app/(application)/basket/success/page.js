"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] =
    (useState < "loading") | "success" | ("failed" > "loading");

  useEffect(() => {
    const statusParam = searchParams.get("Status");
    const authority = searchParams.get("Authority");

    if (statusParam === "OK" && authority) {
      const amount = 10000;

      fetch("https://researchback.onrender.com/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Authority: authority, Amount: amount }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data?.code === 100) {
            setStatus("success");
          } else {
            router.push("/basket/failed");
          }
        })
        .catch(() => {
          setStatus("failed");
          router.push("/basket/failed");
        });
    } else {
      setStatus("failed");
      router.push("/basket/failed");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center flex flex-col items-center">
        {status === "loading" && (
          <>
            <Loader2 className="animate-spin text-[#00A693] w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              در حال بررسی پرداخت
            </h2>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="text-green-500 w-14 h-14 mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              پرداخت با موفقیت تأیید شد 🎉
            </h2>
            <p className="text-gray-600">
              از خرید شما متشکریم! سفارش شما در حال پردازش است
            </p>
          </>
        )}
      </div>
    </div>
  );
}
