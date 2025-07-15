"use client";

import { useEffect, useState } from "react";
import Stepper from "@/components/basket/Stepper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useOrderStore from "@/store/useOrderStore";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";

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
      try {
        const { data } = await Fetch.get('/api/cart', { requiresAuth: true });
        setCart(data);
      } catch (error) {
        toast.error("خطا در بارگذاری سبد خرید");
      }
    };

    fetchCart();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = ["phone", "postalCode"].includes(name)
      ? toEnglishDigits(value)
      : value;
    setFormData({ ...formData, [name]: cleanValue });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const toEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";

    return str.replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "پر کردن این فیلد الزامی است";
    if (!formData.lastName) newErrors.lastName = "پر کردن این فیلد الزامی است";
    if (!formData.city) newErrors.city = "شهر الزامی است";
    if (!formData.province) newErrors.province = "استان الزامی است";
    if (!formData.address) newErrors.address = "پر کردن این فیلد الزامی است";
    if (!/^\d{10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "کد پستی باید دقیقا ۱۰ رقم باشد";
    }

    if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره تلفن باید با 09 شروع شده و 11 رقم باشد";
    }
    return newErrors;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    if (!cart || cart.items.length === 0) {
      toast("سبد خرید شما خالی است");
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
      const { data } = await Fetch.post('/api/orders', finalFormData, { requiresAuth: true });

      const { _id: orderId, amount } = data;

      useOrderStore.getState().setOrder(orderId, amount);

      router.push('/basket/payment');
    } catch (err) {
      if (err.response) {
        toast.error("خطا در ثبت سفارش");
      } else {
        toast.error("ارتباط با سرور برقرار نشد");
      }
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
          className={`p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A693] outline-none text-end`}
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
