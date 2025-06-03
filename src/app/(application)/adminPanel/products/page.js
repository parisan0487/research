"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MiniLoading from "@/component/layout/loading/MiniLoading";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await Fetch.get("/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error("خطا در دریافت محصولات:", err);
                toast.error("خطا در دریافت محصولات")
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("مطمئنی که می‌خوای این محصول رو حذف کنی؟");
        if (!confirmDelete) return;

        try {
            await Fetch.delete(`/api/products/${id}`, { token: true });
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            console.error("خطا در حذف محصول", err);
            toast.error("خطا در حذف محصول")
        }
    };


    return (
        <div className="min-h-screen p-6 " dir="rtl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 overflow-hidden mb-8">
                <h1 className="text-3xl  font-extrabold text-[#00786b] drop-shadow-md text-center sm:text-right">
                    مدیریت محصولات
                </h1>
                <Link
                    href="/adminPanel/products/new"
                    className="bg-[#00a693] hover:bg-[#00917d] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300 whitespace-nowrap select-none text-center sm:text-right"
                >
                    محصول جدید +
                </Link>
            </div>


            {loading ? (
                <MiniLoading />
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-lg border border-[#00a693] bg-white">
                    <table className="min-w-full text-gray-800 text-sm">
                        <thead className="bg-[#00a693] text-white select-none">
                            <tr>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">نام</th>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">قیمت</th>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">دسته‌بندی</th>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500">
                                        محصولی یافت نشد
                                    </td>
                                </tr>
                            )}
                            {products.map((product) => (
                                <tr
                                    key={product._id}
                                    className="border-t border-gray-200 hover:bg-[#d4f5ef] transition-colors duration-200 cursor-pointer"
                                >
                                    <td className="py-3 px-6 font-bold text-gray-900">{product.name}</td>
                                    <td className="py-3 px-6 font-semibold text-gray-800">
                                        {product.price.toLocaleString()} تومان
                                    </td>
                                    <td className="py-3 px-6 text-gray-700">
                                        {product.categories?.join("، ") || "-"}
                                    </td>
                                    <td className="py-3 px-6 flex gap-5 justify-start">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600 font-semibold hover:underline transition select-none"
                                        >
                                            حذف
                                        </button>
                                        <Link
                                            href={`/adminPanel/products/edit/${product._id}`}
                                            className="text-[#00786b] font-semibold hover:underline transition select-none"
                                        >
                                            ویرایش
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}