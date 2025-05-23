"use client";

import { useRouter } from "next/navigation";

function BackToLastPageBtn() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="text-lg text-green-500 font-medium border border-green-500 py-2.5 px-4 rounded-xl cursor-pointer hover:bg-green-100 transition"
    >
      بازگشت به صفحه قبل
    </button>
  );
}

export default BackToLastPageBtn;
