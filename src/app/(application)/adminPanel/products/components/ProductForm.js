"use client";

import { useState, useEffect } from "react";

export default function ProductForm({ initialData = {}, onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        discount: "",
        description: "",
        producter: "",
        imagesInput: "",
        images: [],
        featureInput: "",
        feature: [],
        categories: [],
        categoryInput: "",
        variants: [],
        variantInput: { color: "", size: "", stock: "", price: "" },
        ...initialData,
    });

    useEffect(() => {
        if (initialData?.categories) {
            setFormData((prev) => ({
                ...prev,
                categories: initialData.categories,
                categoryInput: "",
            }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleVariantChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            variantInput: {
                ...prev.variantInput,
                [name]: value,
            },
        }));
    };

    const addVariant = () => {
        const { color, size, stock, price } = formData.variantInput;
        if (color && size && stock) {
            setFormData((prev) => ({
                ...prev,
                variants: [
                    ...prev.variants,
                    {
                        color,
                        size,
                        stock: Number(stock),
                        price: Number(price),
                    },
                ],
                variantInput: { color: "", size: "", stock: "", price: "" },
            }));
        }
    };


    const addToList = (key, inputKey) => {
        const newItem = formData[inputKey].trim();
        if (newItem && !formData[key].includes(newItem)) {
            setFormData((prev) => ({
                ...prev,
                [key]: [...prev[key], newItem],
                [inputKey]: "",
            }));
        }
    };

    const removeFromList = (key, itemToRemove) => {
        setFormData((prev) => ({
            ...prev,
            [key]: prev[key].filter((item) => item !== itemToRemove),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            price: Number(formData.price),
            discount: Number(formData.discount),
            producter: formData.producter || "نامشخص",
        };


        delete dataToSend.categoryInput;
        delete dataToSend.featureInput;
        delete dataToSend.imagesInput;
        delete dataToSend.variantInput;

        console.log("Data being sent:", dataToSend);
        onSubmit(dataToSend);
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded shadow text-right"
            dir="rtl"
        >
            <div>
                <label className="block mb-1 font-semibold text-[#00a693]">نام محصول</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-semibold text-[#00a693]">قیمت</label>
                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-[#00a693]">تخفیف (اختیاری)</label>
                    <input
                        name="discount"
                        type="number"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
            </div>

            <div>
                <label className="block mb-1 font-semibold text-[#00a693]">توضیحات</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold text-[#00a693]">تولیدکننده</label>
                <input
                    name="producter"
                    value={formData.producter}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            {/* دسته‌بندی‌ها */}
            <div>
                <label className="block mb-1 font-semibold text-[#00a693]">دسته‌بندی‌ها</label>
                <div className="flex gap-2">
                    <input
                        name="categoryInput"
                        value={formData.categoryInput}
                        onChange={handleChange}
                        className="flex-1 border px-3 py-2 rounded"
                        placeholder="افزودن دسته‌بندی"
                    />
                    <button
                        type="button"
                        onClick={() => addToList("categories", "categoryInput")}
                        className="bg-[#00a693] text-white px-4 py-2 rounded"
                    >
                        افزودن
                    </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {formData.categories.map((cat, idx) => (
                        <span
                            key={idx}
                            className="bg-[#e0f7f4] text-[#00786b] px-3 py-1 rounded-full flex items-center gap-2"
                        >
                            {cat}
                            <button
                                type="button"
                                onClick={() => removeFromList("categories", cat)}
                                className="text-red-500"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* تصاویر */}
            <div>
                <label className="block mb-1 font-semibold text-[#00a693]">تصاویر (URL)</label>
                <div className="flex gap-2">
                    <input
                        name="imagesInput"
                        value={formData.imagesInput}
                        onChange={handleChange}
                        className="flex-1 border px-3 py-2 rounded"
                        placeholder="افزودن URL تصویر"
                    />
                    <button
                        type="button"
                        onClick={() => addToList("images", "imagesInput")}
                        className="bg-[#00a693] text-white px-4 py-2 rounded"
                    >
                        افزودن
                    </button>
                </div>
                <ul className="mt-2 list-disc pr-5 text-sm text-gray-700">
                    {formData.images.map((url, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                            {url}
                            <button
                                onClick={() => removeFromList("images", url)}
                                className="text-red-500 text-sm"
                            >
                                حذف
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ویژگی‌ها */}
            <div>
                <label className="block mb-1 font-semibold text-[#00a693]">ویژگی‌ها</label>
                <div className="flex gap-2">
                    <input
                        name="featureInput"
                        value={formData.featureInput}
                        onChange={handleChange}
                        className="flex-1 border px-3 py-2 rounded"
                        placeholder="مثلاً: ضدآب، سبک، ..."
                    />
                    <button
                        type="button"
                        onClick={() => addToList("feature", "featureInput")}
                        className="bg-[#00a693] text-white px-4 py-2 rounded"
                    >
                        افزودن
                    </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {formData.feature.map((f, idx) => (
                        <span
                            key={idx}
                            className="bg-[#e0f7f4] text-[#00786b] px-3 py-1 rounded-full flex items-center gap-2"
                        >
                            {f}
                            <button
                                type="button"
                                onClick={() => removeFromList("feature", f)}
                                className="text-red-500"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* واریانت‌ها */}
            <div>
                <label className="block mb-1 font-semibold text-[#00a693]">تنوع‌ها (variants)</label>
                <div className="grid grid-cols-4 gap-2">
                    <input
                        name="color"
                        placeholder="رنگ"
                        value={formData.variantInput.color}
                        onChange={handleVariantChange}
                        className="border px-2 py-1 rounded"
                    />
                    <input
                        name="size"
                        placeholder="سایز"
                        value={formData.variantInput.size}
                        onChange={handleVariantChange}
                        className="border px-2 py-1 rounded"
                    />
                    <input
                        name="stock"
                        placeholder="موجودی"
                        type="number"
                        value={formData.variantInput.stock}
                        onChange={handleVariantChange}
                        className="border px-2 py-1 rounded"
                    />
                    <input
                        name="price"
                        placeholder="قیمت (اختیاری)"
                        type="number"
                        value={formData.variantInput.price}
                        onChange={handleVariantChange}
                        className="border px-2 py-1 rounded"
                    />
                </div>
                <button
                    type="button"
                    onClick={addVariant}
                    className="mt-2 bg-[#00a693] text-white px-4 py-2 rounded"
                >
                    افزودن تنوع
                </button>

                <ul className="mt-3 text-sm text-gray-700 space-y-1">
                    {formData.variants.map((v, idx) => (
                        <li key={idx} className="flex justify-between items-center bg-[#f0fdfa] px-3 py-2 rounded">
                            <span>
                                رنگ: {v.color} | سایز: {v.size} | موجودی: {v.stock} | قیمت: {v.price ?? "اصلی"}
                            </span>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        variants: prev.variants.filter((_, i) => i !== idx),
                                    }))
                                }
                                className="text-red-500 text-sm"
                            >
                                حذف
                            </button>
                        </li>
                    ))}
                </ul>
            </div>


            <button
                type="submit"
                className="bg-[#00a693] text-white px-6 py-2 rounded font-bold hover:bg-[#00917d]"
            >
                ذخیره محصول
            </button>
        </form>
    );
}
