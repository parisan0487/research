"use client"

import ProductForm from "../components/ProductForm";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
    const router = useRouter();

    const handleAdd = async (formData) => {
        try {
            const res = await fetch("https://researchback.onrender.com/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const err = await res.json();
                console.error("Server error:", err);
                alert("خطا در افزودن محصول. لطفاً ورودی‌ها را بررسی کنید.");
                return;
            }

            router.push("/adminPanel/products");
        } catch (error) {
            console.error("Add Product Error:", error); // ← این خیلی کمک می‌کنه
            res.status(500).json({ message: "خطا در افزودن محصول" });
        }

    };


    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
            <h1
                className="text-2xl font-bold text-[#00786b] mb-6 border-b pb-2"
                dir="rtl"
            >
                افزودن محصول جدید
            </h1>    
                <ProductForm onSubmit={handleAdd} />
        </div>
    );
}
