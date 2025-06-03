"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Package, UserRound } from "lucide-react";
import Fetch from "@/utils/Fetch";

export default function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await Fetch.get("/api/users");
        setUser(response.data);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
      }
    };

    fetchUserData();
  }, []);

  const items = [
    {
      title: "آدرس‌ها",
      icon: <MapPin className="w-10 h-10 text-[#00A693]" />,
      href: "/account/address",
    },
    {
      title: "سفارش‌ها",
      icon: <Package className="w-10 h-10 text-[#00A693]" />,
      href: "/account/orders",
    },
    {
      title: "جزئیات حساب",
      icon: <UserRound className="w-10 h-10 text-[#00A693]" />,
      href: "/account/profile",
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-2xl space-y-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#00A693] mb-2">
            سلام {user?.name || "کاربر عزیز"} 👋
          </h2>
          <p className="text-gray-700 text-sm">
            برای مدیریت حساب کاربری خود، یکی از گزینه‌های زیر را انتخاب کنید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ title, icon, href }) => (
            <Link
              key={title}
              href={href}
              className="bg-[#F5F7FF] hover:bg-[#E0F9F4] p-6 rounded-xl flex flex-col items-center justify-center border border-gray-200 hover:shadow-xl transition-all duration-200"
            >
              {icon}
              <p className="mt-4 text-gray-800 font-bold">{title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
