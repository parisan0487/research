import { useEffect, useState } from "react";
import { X, Search, ChevronDown } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import SearchNav from "../SearchNav";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const currentPage = "صفحه اصلی";
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setSubmenuOpen(false);
  }, [pathname]);

  const navItems = [
    { title: "صفحه اصلی", href: "/" },
    {
      title: "فروشگاه",
      href: "/shop",
      children: [
        { href: "/shop/astronomy", title: "نجوم و کیهان شناسی" },
        { href: "/shop/physics", title: "فیزیک و آزمایش های جذاب" },
        { href: "/shop/life", title: "زیست شناسی و علوم زمین" },
        { href: "/shop/net", title: "اینترنت اشیاء" },
        { href: "/shop/robot", title: "هوش مصنوعی و رباتیک" },
        { href: "/shop/lateral", title: "محصولات جانبی" },
      ],
    },
    { title: "وبلاگ", href: "/blog" },
    { title: "تماس با ما", href: "/contact" },
    { title: "درباره ما", href: "/about" },
  ];

  return (
    <div className="min-[970px]:hidden">
      <div onClick={() => setIsOpen(true)} className="p-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="0.3"
          className="size-9 text-[#1C39BB]"
        >
          <path d="M15.87 16.93H7.33A5.33 5.33 0 0 1 2 11.6V7.33A5.33 5.33 0 0 1 7.33 2h4.27a5.33 5.33 0 0 1 5.33 5.33v8.53a1.07 1.07 0 0 1-1.06 1.07ZM7.33 4.13a3.2 3.2 0 0 0-3.2 3.2v4.27a3.2 3.2 0 0 0 3.2 3.2h7.47V7.33a3.2 3.2 0 0 0-3.2-3.2ZM28.67 16.93h-8.54a1.07 1.07 0 0 1-1.07-1.07V7.33A5.33 5.33 0 0 1 24.4 2h4.27A5.33 5.33 0 0 1 34 7.33v4.27a5.33 5.33 0 0 1-5.33 5.33ZM21.2 14.8h7.47a3.2 3.2 0 0 0 3.2-3.2V7.33a3.2 3.2 0 0 0-3.2-3.2H24.4a3.2 3.2 0 0 0-3.2 3.2ZM11.6 34H7.33A5.33 5.33 0 0 1 2 28.67V24.4a5.33 5.33 0 0 1 5.33-5.33h8.53a1.07 1.07 0 0 1 1.07 1.07v8.53A5.33 5.33 0 0 1 11.6 34ZM7.33 21.2a3.2 3.2 0 0 0-3.2 3.2v4.27a3.2 3.2 0 0 0 3.2 3.2h4.27a3.2 3.2 0 0 0 3.2-3.2V21.2ZM28.67 34H24.4a5.33 5.33 0 0 1-5.33-5.33v-8.54a1.07 1.07 0 0 1 1.07-1.07h8.53A5.33 5.33 0 0 1 34 24.4v4.27A5.33 5.33 0 0 1 28.67 34ZM21.2 21.2v7.47a3.2 3.2 0 0 0 3.2 3.2h4.27a3.2 3.2 0 0 0 3.2-3.2V24.4a3.2 3.2 0 0 0-3.2-3.2Z" />
        </svg>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={clsx(
          "fixed top-0 right-0 w-[300px] h-full bg-white z-50 shadow-xl px-4 py-5 transition-all duration-600 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end mb-4" dir="rtl">
          <X
            className="text-[#00A693] cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className=" mb-7">
          <SearchNav />
        </div>

        <ul className="flex flex-col gap-1 text-right px-2" dir="rtl">
          {navItems.map((item, index) => (
            <li key={index}>
              <div>
                <div
                  className={clsx(
                    "flex items-center justify-between cursor-pointer px-3 py-2 rounded-xl transition-colors",
                    item.title === currentPage
                      ? "text-[#00A693] font-semibold"
                      : "text-gray-700",
                    "hover:bg-green-200"
                  )}
                  onClick={() => {
                    if (item.children) {
                      setSubmenuOpen((prev) => !prev);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                >
                  {item.children ? (
                    <>
                      <span>{item.title}</span>
                      <ChevronDown
                        size={18}
                        className={clsx(
                          "transition-transform",
                          submenuOpen && "rotate-180"
                        )}
                      />
                    </>
                  ) : (
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      <span>{item.title}</span>
                    </Link>
                  )}
                </div>

                {item.children && submenuOpen && (
                  <ul className="pr-5 pl-2 mt-1 flex flex-col gap-1 text-sm">
                    {item.children.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-gray-600 hover:bg-green-100 rounded-xl px-3 py-1 transition"
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


