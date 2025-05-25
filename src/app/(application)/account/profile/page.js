"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://researchback.onrender.com/api/users/");
        const data = await res.json();
        setName(data.name || "");
        setPhone(data.phone || "");
      } catch (err) {
        console.error("خطا در دریافت اطلاعات کاربر:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(
        "https://researchback.onrender.com/api/users/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, phone }),
        }
      );

      if (res.ok) {
        setMessage("اطلاعات با موفقیت ذخیره شد ✅");
      } else {
        setMessage("مشکلی در ذخیره اطلاعات به‌وجود آمد ❌");
      }
    } catch (err) {
      console.error("خطا در ذخیره اطلاعات:", err);
      setMessage("خطایی رخ داد ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-right space-y-6">
      <h1 className="text-2xl font-extrabold text-[#00A693]">
        جزئیات حساب کاربری
      </h1>

      {loading ? (
        <p className="text-gray-700">در حال بارگذاری</p>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-800 mb-1 font-medium">نام</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A693] text-end"
              placeholder="نام خود را وارد کنید"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-1 font-medium">
              شماره موبایل
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A693] text-end"
              placeholder="09XXXXXXXXX"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#00A693] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#039a87] transition"
          >
            {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>

          {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
        </div>
      )}
    </div>
  );
}
