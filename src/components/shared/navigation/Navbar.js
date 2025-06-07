"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  User,
  HelpCircle,
  Phone,
  ShoppingCart,
  ShoppingCartIcon,
  Flame,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchNav from "../SearchNav";
import useAuthStore from "@/store/authStore";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSubmenuOpen(false);
    }, 300);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const linkHref = isLoggedIn ? "/account" : "/register";

  const navLinks = [
    { href: "/contact", icon: <Phone size={16} />, label: "تماس با ما" },
    { href: "/about", icon: <HelpCircle size={16} />, label: "درباره ما" },
    { href: "/shop/offer", icon: <Flame size={16} />, label: "پیشنهاد ویژه" },
  ];

  return (
    <header className="flex justify-between gap-4 items-center p-4 bg-white text-right border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Link href="/basket">
          <button className="p-3 rounded-full bg-[#F5F7FF]">
            <ShoppingCartIcon className="text-[#1C39BB]" size={20} />
          </button>
        </Link>
        <Link href={linkHref}>
          <button className="p-3 rounded-full bg-[#F5F7FF]">
            <User className="text-[#1C39BB] " size={20} />
          </button>
        </Link>
        <div className="relative max-[652px]:hidden">
          <SearchNav />
        </div>
      </div>

      <nav className="max-[970px]:hidden">
        <ul className="flex gap-4 text-lg items-center">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 relative `}
                >
                  {item.icon}
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-full transition-transform duration-300 origin-center bg-emerald-100 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              </li>
            );
          })}

          <li
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p className="flex items-center gap-1 cursor-pointer relative text-emerald-700 group">
              <ShoppingCart size={14} />
              فروشگاه
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-full scale-x-0 bg-emerald-100 transition-transform duration-300 group-hover:scale-x-100 origin-center"></span>
            </p>

            {submenuOpen && (
              <ul className="absolute top-full right-0 flex flex-col bg-gradient-to-br from-[#F8FAFC] to-[#EEF9F4] shadow-xl rounded-xl p-2 mt-2 z-50 min-w-[230px] text-sm border border-[#DCEEEE]">
                {[
                  { href: "/shop/astronomy", label: "نجوم و کیهان شناسی" },
                  { href: "/shop/physics", label: "فیزیک و آزمایش های جذاب" },
                  { href: "/shop/life", label: "زیست شناسی و علوم زمین" },
                  { href: "/shop/net", label: "اینترنت اشیاء" },
                  { href: "/shop/robot", label: "هوش مصنوعی و رباتیک" },
                  { href: "/shop/lateral", label: "محصولات جانبی" },
                ].map((item) => (
                  <li key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className="block px-4 py-2 rounded-md text-[#1E293B] hover:bg-gradient-to-r from-[#CFFAFE] to-[#A7F3D0] hover:text-black transition-all duration-300 font-medium"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full bg-[#10B981] transition-all duration-300 origin-center"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/assets/img/Logo.svg"
            alt="لوگو"
            width={190}
            height={190}
          />
        </Link>
      </div>

      <Sidebar />
    </header>
  );
};


