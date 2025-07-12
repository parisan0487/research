"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "../../components/ProductForm";
import MiniLoading from "@/components/shared/loading/MiniLoading";

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log("id دریافت شده:", id);
        fetch(`https://researchback.onrender.com/api/products/id/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                console.log("datas", data);
            })
    }, [id]);

    const handleEdit = async (formData) => {
        await fetch(`https://researchback.onrender.com/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        router.push("/adminPanel/products");
    };

    if (!product) return <MiniLoading />;

    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
            <h1
                className="text-2xl font-bold text-[#00786b] mb-6 border-b pb-2"
                dir="rtl"
            >
                ویرایش محصول
            </h1>
            <ProductForm initialData={product} onSubmit={handleEdit} />
        </div>
    );
}
