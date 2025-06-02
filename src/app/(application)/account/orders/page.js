"use client";

import MiniLoading from "@/component/layout/loading/MiniLoading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("https://researchback.onrender.com/api/orders/user-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("خطا در گرفتن سفارشات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePay = async (orderId, amount) => {
    console.log(orderId, amount)
    if (!orderId || !amount) return;

    try {
      const res = await fetch("https://researchback.onrender.com/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          description: `پرداخت سفارش شماره ${orderId}`,
          orderId,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(`پرداخت ناموفق بود: ${data?.message || data?.error || "خطای ناشناخته"}`);
        console.error("❌ Server error:", data);
      }
    } catch (err) {
      toast.error("خطا در برقراری ارتباط با سرور");
      console.error("❌ Fetch error:", err);
    }
  };

  if (loading) {
    return <MiniLoading />;
  }

  return (
    <div className="p-6 bg-[#f8f9fa] text-right rtl">
      <h1 className="text-2xl font-bold text-[#00A693] border-b-4 border-[#00A693] w-fit pb-2 mb-6">
        سفارش‌های من
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-800 text-base bg-yellow-100 h-12 text-center rounded-2xl flex items-center justify-center shadow">
          هنوز هیچ سفارشی ثبت نشده است
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <li
              key={order._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 leading-relaxed space-y-2"
            >
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-[#00A693]">شماره سفارش:</span> {order._id}
              </p>
              <div className="mt-4 border-t pt-3">
                <p className="font-semibold mb-2">محصولات سفارش داده شده:</p>
                <ul className="list-disc pr-5 space-y-1 text-sm text-gray-700">
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.productId?.name || "نامشخص"} - {item.quantity} عدد
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">مبلغ:</span>{" "}
                <span className="text-[#00A693] font-bold">{order.amount.toLocaleString()} تومان</span>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">وضعیت:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-medium ${order.status === "paid" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                >
                  {order.status === "paid" ? "پرداخت شده" : "در انتظار پرداخت"}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                📅 {new Date(order.createdAt).toLocaleDateString("fa-IR")}
              </p>

              {order.status !== "paid" && (
                <div className="pt-2 text-center">
                  <button
                    onClick={() => handlePay(order._id, order.amount)}
                    className="mt-2 bg-[#00A693] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#009481] transition"
                  >
                    💳 همین حالا پرداخت کن
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
