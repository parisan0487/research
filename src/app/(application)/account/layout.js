"use client";

import Breadcrumb from "@/component/ui/Breadcrumb";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const menuItems = [
  { href: "/account/orders", label: "سفارش ها" },
  { href: "/account/address", label: "آدرس ها" },
  { href: "/account/profile", label: "جزئیات حساب" },
];

function getCurrentPageTitle(pathname) {
  const found = menuItems.find((item) => pathname.startsWith(item.href));
  return found ? found.label : "پیشخوان";
}

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const currentPage = getCurrentPageTitle(pathname);

  const breadcrumbItems = [
    { text: "صفحه اصلی", href: "/" },
    { text: "حساب کاربری", href: "/account" },
  ];

  if (pathname !== "/account") {
    breadcrumbItems.push({ text: currentPage, href: pathname });
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    toast.success("خروج موفقیت آمیزبود");
    router.push("/");
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row-reverse mt-5 gap-6 font-gandom min-h-[70vh]">
        {/* سایدبار */}
        <aside className="w-full md:max-w-xs rounded-2xl shadow-md bg-white p-4">
          <div className="bg-[#00A693] text-white text-center py-2 rounded-md font-bold mb-4">
            <Link href="/account">پیشخوان</Link>
          </div>
          <ul className="space-y-3 text-right px-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-md transition-all ${
                    pathname.startsWith(item.href)
                      ? "bg-[#00A693]/10 text-[#00A693] font-bold"
                      : "text-gray-700 hover:text-[#00A693]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-right block px-3 py-2 rounded-md transition-all text-gray-700 hover:text-red-600"
              >
                خروج
              </button>
            </li>
          </ul>
        </aside>

        <main className="flex-1 bg-gray-50 p-4 md:p-8 rounded-2xl shadow-md">
          {children}
        </main>
      </div>
    </>
  );
}
