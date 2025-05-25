"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await axios.get(
          "https://researchback.onrender.com/api/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data);
        console.log(response.data);
      } catch (error) {}
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-4 ">
      <div className="bg-white p-6 rounded-2xl  space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#00A693] mb-2">
            سلام {user?.name}
          </h2>
          <p className="text-gray-800 text-sm">
            جهت دسترسی آسان به لینک‌های پیشخوان می‌توانید از گزینه‌های زیر اقدام
            فرمایید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "آدرس", icon: "🗺️", href: "/account/address" },
            { title: "سفارش ها", icon: "📦", href: "/account/orders" },
            { title: "جزئیات حساب", icon: "👤", href: "/account/profile" },
          ].map(({ title, icon, href }) => (
            <a
              key={title}
              href={href}
              className="bg-[#F5F7FF] hover:bg-[#E0F9F4] p-6 rounded-xl flex flex-col items-center justify-center shadow-sm border border-gray-100 transition"
            >
              <div className="text-4xl mb-3 text-[#00A693]">{icon}</div>
              <p className="text-gray-800 font-semibold">{title}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
