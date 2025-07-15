"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import Fetch from "@/utils/Fetch";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  { href: "/adminPanel/dashboard", label: "داشبورد آماری" },
  { href: "/adminPanel/users", label: "کاربران" },
  { href: "/adminPanel/products", label: "محصولات" },
  { href: "/adminPanel/orders", label: "سفارش ها" },
];

function getCurrentPageTitle(pathname) {
  const found = menuItems.find((item) => pathname.startsWith(item.href));
  return found ? found.label : "پیشخوان";
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/register");
          return;
        }

        const response = await Fetch.get("/api/users", { token: true });
        const userData = response.data;

        if (userData.role !== "admin") {
          router.push("/not-found");
        } else {
          setUser(userData);
        }
      } catch (error) {
        router.push("/register");
      }
    };

    fetchUserData();
  }, []);

  const currentPage = getCurrentPageTitle(pathname);

  const breadcrumbItems = [
    { text: "صفحه اصلی", href: "/" },
    { text: "پنل ادمین", href: "/adminPanel" },
  ];

  if (pathname !== "/adminPanel") {
    breadcrumbItems.push({ text: currentPage, href: pathname });
  }

  // اگر هنوز اطلاعات کاربر واکشی نشده، چیزی نمایش نده
  if (!user) return null;

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col lg:flex-row-reverse mt-5 gap-6 font-gandom min-h-[70vh]">
        <aside className="w-full lg:max-w-xs rounded-2xl shadow-md bg-white p-4 max-h-[470px]">
          <div className="bg-[#00A693] text-white text-center py-2 rounded-md font-bold mb-4">
            <Link href="/account">پیشخوان</Link>
          </div>
          <ul className="space-y-3 text-right px-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-md transition-all ${pathname.startsWith(item.href)
                      ? "bg-[#00A693]/10 text-[#00A693] font-bold"
                      : "text-gray-700 hover:text-[#00A693]"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 bg-gray-50 p-4 md:p-8 rounded-2xl shadow-md">
          {children}
        </main>
      </div>
    </>
  );
}
