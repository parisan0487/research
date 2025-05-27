"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Basket() {
  const [cart, setCart] = useState(null); // شروع با null بهتره

  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) return;

  //       const response = await axios.get(
  //         "https://researchback.onrender.com/api/cart",
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       setCart(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching cart:", error);
  //     }
  //   };

  //   fetchCartData();
  // }, []);

  useEffect(() => {
    const fakeCart = {
      items: [
        {
          product: {
            _id: "123",
            name: "تیشرت تستی",
            price: 250000,
            images: ["/assets/img/product4.webp"],
          },
          quantity: 2,
          variant: {
            color: "مشکی",
            size: "L",
          },
        },
      ],
    };

    setCart(fakeCart);
  }, []);

  if (!cart) {
    return (
      <div>
        <p>درحال بارگذاری</p>
      </div>
    );
  }

  return (
    <div className="">
      {cart.items.length === 0 ? (
        <div className="text-center justify-center grid">
          <h2 className="text-2xl font-semibold text-gray-700">
            سبد خرید شما خالی است
          </h2>
          <p className="text-gray-500 mt-4 mb-10">
            محصولی برای نمایش وجود ندارد
          </p>
          <Link
            href="/"
            className="flex items-center w-60 gap-2 sm:text-lg  bg-green-500 text-white font-medium py-2.5 px-4 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="9">
                <path
                  id="Union"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.5713 3.42859H6.857V3.42882L6.857 3.42881L3.50628 6.79171L8.42978 11.6974L3.69217 15.5605V20.5714H8.43942V11.707L17.1937 20.4295L20.5444 17.0666L11.6213 8.17584H20.5713V3.42859Z"
                  fill="white"
                ></path>
              </g>
            </svg>
            بازگشت به صفحه اصلی
          </Link>
        </div>
      ) : (
        <div className="flex flex-col-reverse md:flex-row-reverse gap-6 p-4 overflow-x-hidden text-right">
          {/* محصولات (راست) */}
          <div className="w-full md:w-2/3 min-w-0" id="product-details">
            <div className="space-y-8 mb-[50px]">
              {cart.items.map((item) => (
                <div
                  key={`${item.product?._id}`}
                  className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-xl shadow-md p-4 hover:scale-[1.02] transition-transform"
                >
                  <div className="flex gap-2">
                    <button className="bg-[#00A693] text-white px-3 py-1.5 rounded-full hover:bg-[#008B7A]">
                      -
                    </button>
                    <p className="text-xl w-8 h-8 bg-gray-100 border border-gray-300 rounded-lg text-center leading-8">
                      {item.quantity}
                    </p>
                    <button className="bg-[#44e4d1] text-white px-3 py-1.5 rounded-full hover:bg-[#29c6b5]">
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div>
                      <h3 className="text-base font-semibold truncate w-40">
                        {item.product?.name || "نام محصول"}
                      </h3>
                      <p className="text-sm text-[#00A693]">
                        {item.product?.price ?? 0} تومان
                      </p>
                      <p className="text-sm text-[#00A693]">
                        تعداد: {item.quantity}
                      </p>
                    </div>
                    <Image
                      src={
                        item.product?.images[0] || "/path/to/default/image.jpg"
                      }
                      alt={item.product?.name || "تصویر محصول"}
                      width={80}
                      height={60}
                      className="rounded-md border border-gray-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* پرداخت) */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg min-w-0">
            <h3 className="text-2xl font-bold mb-4 text-[#00A693]">
              جزئیات پرداخت
            </h3>

            <div className="mb-6">
              <p className="text-lg text-[#00A693]">مبلغ کل: {7800} تومان</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-[#00A693] mb-2">
                کد تخفیف
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  className="w-full p-2 border border-[#44e4d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44e4d1]"
                />
                <button className="bg-[#00A693] text-white sm:w-24 w-full rounded-lg py-2 hover:bg-[#008B7A]">
                  اعمال کد
                </button>
              </div>
            </div>

            <div className="border-t border-gray-100 my-4"></div>

            <div className="mb-6">
              <p className="text-lg text-[#00A693]">
                مبلغ قابل پرداخت: {879} تومان
              </p>
            </div>

            <Link href="/basket/checkout">
              <button className="bg-[#44e4d1] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#29c6b5] w-full">
                ادامه مراحل خرید
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
