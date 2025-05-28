"use client";

import { BarChart3, PackageCheck, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const items = [
    {
      title: "سفارش‌ها",
      icon: <ShoppingCart className="w-10 h-10 text-[#00A693]" />,
      href: "/adminPanel/orders",
    },
    {
      title: "مدیریت محصولات",
      icon: <PackageCheck className="w-10 h-10 text-[#00A693]" />,
      href: "/adminPanel/products",
    },
    {
      title: "داشبورد آماری",
      icon: <BarChart3 className="w-10 h-10 text-[#00A693]" />,
      href: "/adminPanel/dashboard",
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-2xl space-y-6 shadow-lg">
        <div className="text-center">
          <p className="text-gray-700 text-sm font-medium">
            جهت دسترسی آسان به بخش‌های مختلف پنل، از لینک‌های زیر استفاده کنید
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
