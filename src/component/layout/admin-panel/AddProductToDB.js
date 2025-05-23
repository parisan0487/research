"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProductsToDB = () => {
  const [status, setStatus] = useState();

  const products = [
    {
      id: "123",
      name: "شکلات خوری چوبی",
      discount: 97000,
      price: 697000,
      description: "شکلات خوری چوبی معرق کاری",
      categories: ["b1", "b2", "b3"],
      producter: "تهران",
      images: [
        "/assets/img/product4.webp",
        "/assets/img/product4.webp",
        "/assets/img/product4.webp",
      ],
      variants: [{ color: "مشکی", size: "2xl", stock: 10 }],
    },
    {
      id: "124",
      name: " ccشکلات خوری چوبی",
      discount: 97000,
      price: 697000,
      description: "شکلات خوری چوبی معرق کاری",
      categories: ["b1", "b3", "b5"],
      producter: "تهران",
      images: ["/assets/img/product4.webp"],
      variants: [{ color: "مشکی", size: "2xl", stock: 10 }],
    },
    {
      id: "125",
      name: "ttشکلات خوری چوبی",
      discount: 97000,
      price: 697000,
      description: "شکلات خوری چوبی معرق کاری",
      categories: ["b4", "b5", "b3", "b1"],
      producter: "تهران",
      images: ["/assets/img/product4.webp"],
      variants: [{ color: "مشکی", size: "2xl", stock: 10 }],
    },
  ];

  const addProducts = async () => {
    setStatus("در حال ارسال");
    try {
      const productsToSend = products.map((product) => ({
        ...product,
      }));

      await axios.post(
        "https://researchback.onrender.com/api/products/add-multiple",
        { products: productsToSend },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatus("اضافه شد");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
      toast.error(errorMessage);
      console.error("axios error:", err);
    }
  };

  const deleteAllProducts = async () => {
    try {
      await axios.delete(
        "https://researchback.onrender.com/api/products/delete-all"
      );
      alert("پاک شد");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
      toast.error(errorMessage);
      console.error("axios error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <button
        onClick={addProducts}
        className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all"
      >
        افزودن محصولات
      </button>
      {status && <p className="text-gray-700 font-semibold">{status}</p>}

      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <button
          onClick={deleteAllProducts}
          className="px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-lg transition-all"
        >
          حذف تمام محصولات
        </button>
      </div>
    </div>
  );
};

export default AddProductsToDB;
