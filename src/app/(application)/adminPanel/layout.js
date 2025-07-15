"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

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
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/register");
    } else if (user.role !== "admin") {
      router.push("/not-found");
    }
  }, [user]);


  const currentPage = getCurrentPageTitle(pathname);

  const breadcrumbItems = [
    { text: "صفحه اصلی", href: "/" },
    { text: "پنل ادمین", href: "/adminPanel" },
  ];

  if (pathname !== "/adminPanel") {
    breadcrumbItems.push({ text: currentPage, href: pathname });
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col lg:flex-row-reverse mt-5 gap-6 font-gandom min-h-[70vh]">
        {/* سایدبار */}
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
