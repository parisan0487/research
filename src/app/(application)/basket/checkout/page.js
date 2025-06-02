"use client";

import { useEffect, useState } from "react";
import Stepper from "@/component/ui/Stepper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useOrderStore from "@/store/useOrderStore";
import toast from "react-hot-toast";

export default function Checkout() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    province: "",
    address: "",
    postalCode: "",
    phone: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("https://researchback.onrender.com/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCart(data);
    };

    fetchCart();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "پر کردن این فیلد الزامی است";
    if (!formData.lastName) newErrors.lastName = "پر کردن این فیلد الزامی است";
    if (!formData.city) newErrors.city = "شهر الزامی است";
    if (!formData.province) newErrors.province = "استان الزامی است";
    if (!formData.address) newErrors.address = "پر کردن این فیلد الزامی است";
    if (!formData.postalCode) newErrors.postalCode = "کد پستی باید ۱۰ رقم باشد";
    if (!formData.phone) newErrors.phone = "شماره تلفن باید 11 رقم باشد";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");

    if (!cart || cart.items.length === 0) {
      alert("سبد خرید شما خالی است");
      return;
    }

    const cartItems = cart.items.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const finalFormData = {
      ...formData,
      items: cartItems,
      amount: totalAmount,
    };

    try {
      const res = await fetch("https://researchback.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalFormData),
      });

      if (res.ok) {
        const { _id: orderId, amount } = await res.json();
        useOrderStore.getState().setOrder(orderId, amount);
        console.log(orderId, amount)

        router.push("/basket/payment");
      } else {
        toast.error("خطا در ثبت سفارش");
      }
    } catch (err) {
      toast.error("ارتباط با سرور برقرار نشد");
    }
  };


  const renderInput = (name, placeholder, extraClass = "", isTextArea = false) => (
    <div className={`flex flex-col ${extraClass}`}>
      {isTextArea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={`p-3 border border-gray-300
            } rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none resize-none h-32 text-end`}
        />
      ) : (
        <input
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={`p-3 border border-gray-300
            } rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end`}
        />
      )}
      {errors[name] && <p className="text-red-500 text-sm mt-1 text-end">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="p-10">
      <Stepper currentStep={2} />
      <div className="min-h-screen overflow-hidden">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 shadow-xl gap-6 p-6 sm:p-10"
            >
              <div>
                <h1 className="text-3xl font-bold text-[#00A693] mb-10 text-center">
                  جزئیات صورت‌حساب
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {renderInput("lastName", "نام خانوادگی")}
                  {renderInput("firstName", "نام")}
                  {renderInput("city", "شهر")}
                  {renderInput("province", "استان")}
                  {renderInput("address", "آدرس خیابان", "sm:col-span-2")}
                  {renderInput("postalCode", "کدپستی")}
                  {renderInput("phone", "تلفن")}
                  {renderInput("description", "توضیحات سفارش (اختیاری)", "sm:col-span-2", true)}
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full bg-[#00A693] text-white p-3 rounded-lg hover:bg-[#008B7A] transition-all duration-300 text-lg"
                >
                  ثبت سفارش
                </button>
              </div>

              <Link href="/basket">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-300 px-6 py-3 rounded-xl text-base w-full sm:w-auto"
                >
                  <ArrowRight className="w-4 h-4" />
                  بازگشت
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
