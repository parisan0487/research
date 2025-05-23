"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/component/ui/Breadcrumb";

export default function RegisterComp() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const validateName = (name) => /^[\u0600-\u06FF\sA-Za-z]{3,}$/.test(name);
  const validatePhone = (phone) => /^09\d{9}$/.test(phone);

  const handleSubmit = async () => {
    e.preventDefault();

    if (!isLogin) {
      if (!validateName(name)) {
        toast.info("نام کامل باید حداقل ۳ کاراکتر و فقط شامل حروف باشد.", {
          theme: "colored",
        });
        return;
      }
      if (!validatePhone(phone)) {
        toast.info("شماره تلفن باید ۱۱ رقم و با ۰۹ شروع شود.", {
          theme: "colored",
        });
        return;
      }
    }

    const userData = isLogin ? { phone, password } : { name, phone, password };

    try {
      const endpoint = isLogin
        ? "https://researchback.onrender.com/api/users/login"
        : "https://researchback.onrender.com/api/users/register";

      const res = await axios.post(endpoint, userData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", res.data.token);
      toast.success(
        isLogin ? "ورود موفقیت‌آمیز بود!" : "ثبت‌نام موفقیت‌آمیز بود!",
        {
          theme: "colored",
        }
      );

      setName("");
      setPhone("");
      setPassword("");

      router.push("/");
    } catch (err) {
      toast.error("خطایی رخ داده است", {
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: "ثبت نام", href: "/register" },
        ]}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 font-gandom">
        <div className="flex items-center space-x-2 mb-10">
          <span
            className={`text-lg font-semibold ${
              isLogin ? "text-green-700" : "text-gray-500"
            }`}
          >
            ورود
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!isLogin}
              onChange={() => setIsLogin(!isLogin)}
            />
            <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-[#44e4d1] transition relative">
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                  isLogin ? "left-1" : "translate-x-6"
                }`}
              ></div>
            </div>
          </label>
          <span
            className={`text-lg font-semibold ${
              !isLogin ? "text-green-700" : "text-gray-500"
            }`}
          >
            ثبت نام
          </span>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isLogin ? "ورود به حساب" : "ایجاد حساب کاربری"}
          </h2>
          <form>
            {!isLogin && (
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#44e4d1] text-end"
                  placeholder="نام کامل"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#44e4d1] text-end"
                placeholder="شماره تلفن (مثال: 09123456789)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#44e4d1] text-end"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#44e4d1] transition"
              onClick={handleSubmit}
            >
              {isLogin ? "بزن بریم" : "ثبت نام"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
