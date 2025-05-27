"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("در حال بررسی پرداخت...");

  useEffect(() => {
    const status = searchParams.get("Status");
    const authority = searchParams.get("Authority");

    if (status === "OK" && authority) {
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
            setMessage("✅ پرداخت با موفقیت تأیید شد");
          } else {
            // اگه پرداخت ناموفق بود یا قبلاً تأیید شده، هدایت به صفحه خطا
            router.push("/basket/failed");
          }
        })
        .catch(() => {
          setMessage("❌ خطا در بررسی پرداخت");
          router.push("/basket/failed");
        });
    } else {
      setMessage("❌ وضعیت پرداخت نامشخص است");
      router.push("/basket/failed");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-bold">
      {message}
    </div>
  );
}
