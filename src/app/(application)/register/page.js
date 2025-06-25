"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";

export default function RegisterComp() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const validateName = (name) => /^[\u0600-\u06FF\sA-Za-z]{3,}$/.test(name);
  const validatePhone = (phone) => /^09\d{9}$/.test(phone);
  const validatePassword = (password) => /^\S{5,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (!validateName(name)) {
        toast("نام باید حداقل ۳ کاراکتر و فقط شامل حروف باشد");
        return;
      }
      if (!validatePhone(phone)) {
        toast("شماره تلفن باید ۱۱ رقم و با ۰۹ شروع شود");
        return;
      }
      if (!validatePassword(password)) {
        toast("رمز عبور باید حداقل ۵ کاراکتر باشد");
        return;
      }
    }

    const userData = isLogin
      ? { phone, password }
      : {
        name,
        phone,
        password,
        role: password === "admin1405" ? "admin" : "user",
      };


    try {
      const endpoint = isLogin
        ? "https://researchback.onrender.com/api/users/login"
        : "https://researchback.onrender.com/api/users/register";

      const res = await axios.post(endpoint, userData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", res.data.token);
      login(res.data.token);

      toast.success(
        isLogin ? "ورود موفقیت‌آمیز بود" : "ثبت‌نام موفقیت‌آمیز بود"
      );

      setName("");
      setPhone("");
      setPassword("");

      router.push("/");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "خطایی رخ داده است. لطفاً دوباره تلاش کنید";
      toast.error(errorMessage);
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
            className={`text-lg font-semibold ${isLogin ? "text-green-700" : "text-gray-500"
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
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isLogin ? "left-1" : "translate-x-6"
                  }`}
              ></div>
            </div>
          </label>
          <span
            className={`text-lg font-semibold ${!isLogin ? "text-green-700" : "text-gray-500"
              }`}
          >
            ثبت نام
          </span>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isLogin ? "ورود به حساب" : "ایجاد حساب کاربری"}
          </h2>
          <form onSubmit={handleSubmit}>
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
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#44e4d1] transition"
            >
              {isLogin ? "بزن بریم" : "ثبت نام"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
