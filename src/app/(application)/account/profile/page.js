"use client";
import MiniLoading from "@/components/shared/loading/MiniLoading";
import Fetch from "@/utils/Fetch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Fetch.get("/api/users/", { token: true });
        const data = res.data;

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
    try {
      const res = await Fetch.put(
        "/api/users/update",
        { name, phone },
        { token: true }
      );

      if (res.status >= 200 && res.status < 300) {
        toast.success("اطلاعات با موفقیت ذخیره شد");
      } else {
        toast.error("مشکلی در ذخیره اطلاعات به‌وجود آمد");
      }
    } catch (err) {
      console.error("خطا در ذخیره اطلاعات:", err);
      toast.error("خطایی رخ داد");
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
        <MiniLoading />
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
            {saving ? "...در حال ذخیره" : "ذخیره تغییرات"}
          </button>
        </div>
      )}
    </div>
  );
}
