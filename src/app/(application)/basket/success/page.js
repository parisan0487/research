"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  useEffect(() => {
    if (status === "OK" && authority) {
      console.log("پرداخت موفق با Authority:", authority);

      // اینجا می‌تونی درخواست به بک‌اند بزنی برای verify (اختیاری)

      // پاک کردن query params از URL بعد از چند ثانیه
      setTimeout(() => {
        router.replace("/basket/success");
      }, 2000);
    } else {
      console.log("پرداخت ناموفق یا Authority موجود نیست.");
      // می‌تونی redirect کنی به صفحه خطا یا نمایش پیام شکست
    }
  }, [authority, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      {status === "OK" ? "پرداخت با موفقیت انجام شد 🎉" : "پرداخت انجام نشد ❌"}
    </div>
  );
}
