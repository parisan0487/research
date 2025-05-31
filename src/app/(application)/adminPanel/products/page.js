"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://researchback.onrender.com/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleDelete = async (id) => {
        const confirm = window.confirm("آیا مطمئنی که می‌خوای این محصول رو حذف کنی؟");
        if (!confirm) return;

        await fetch(`https://researchback.onrender.com/api/products/${id}`, { method: "DELETE" });
        setProducts((prev) => prev.filter((p) => p._id !== id));
    };

    return (
        <div className="space-y-6 p-4">
            <div className="flex justify-between items-center gap-2 flex-nowrap overflow-hidden">
                <Link
                    href="/adminPanel/products/new"
                    className="bg-[#00a693] hover:bg-[#00917d] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-semibold transition duration-200 whitespace-nowrap"
                >
                    + محصول جدید
                </Link>
                <h1 className="text-lg sm:text-2xl font-bold text-[#00786b] whitespace-nowrap truncate">
                    مدیریت محصولات
                </h1>
            </div>


            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-[#e0f7f4] text-[#00786b]">
                        <tr>
                            <th className="text-right py-3 px-4 font-semibold">عملیات</th>
                            <th className="text-right py-3 px-4 font-semibold">دسته‌بندی</th>
                            <th className="text-right py-3 px-4 font-semibold">قیمت</th>
                            <th className="text-right py-3 px-4 font-semibold">نام</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product._id}
                                className="border-t hover:bg-[#f0fdfa] transition duration-150"
                                dir="rtl"
                            >
                                <td className="py-2 px-4 flex gap-3">
                                    <Link
                                        href={`/adminPanel/products/edit/${product._id}`}
                                        className="text-[#00786b] hover:underline font-medium"
                                    >
                                        ویرایش
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-600 hover:underline font-medium"
                                    >
                                        حذف
                                    </button>
                                </td>
                                <td className="py-2 px-4 text-gray-700">
                                    {product.categories?.join("، ")}
                                </td>
                                <td className="py-2 px-4 text-gray-800 font-semibold">
                                    {product.price.toLocaleString()} تومان
                                </td>
                                <td className="py-2 px-4 font-bold text-gray-900">
                                    {product.name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
