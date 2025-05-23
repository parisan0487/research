// async function getProductsByCategory(category) {
//   // دیتای تستی بر اساس دسته‌بندی
//   const mockProducts = {
//     orange: [
//       {
//         id: 1,
//         title: "پرتقال ۱",
//         price: 10000,
//         image: "/assets/img/product4.webp",
//       },
//       {
//         id: 2,
//         title: "پرتقال ۲",
//         price: 12000,
//         image: "/assets/img/product4.webp",
//       },
//     ],
//     physics: [
//       {
//         id: 3,
//         title: "آزمایش فیزیک ۱",
//         price: 25000,
//         image: "/assets/img/product4.webp",
//       },
//       {
//         id: 4,
//         title: "آزمایش فیزیک ۲",
//         price: 30000,
//         image: "/assets/img/product4.webp",
//       },
//     ],
//     biology: [
//       { id: 5, title: "کیت زیست ۱", price: 22000, image: "/img/biology1.jpg" },
//     ],
//   };
"use client";
import { useState } from "react";

//   // اگر دسته‌بندی پیدا نشد، آرایه خالی برگردون
//   return mockProducts[category] || [];
// }

export default function CategoryPage() {
  const [products, setProducts] = useState([
    {
      id: "129",
      name: "شلوار راحتی",
      price: 1100000,
      discount: 100000,
      description: "شلوار راحتی با کیفیت بالا",
      categories: ["شلوار", "راحتی"],
      producter: "اصفهان",
      images: ["/assets/images/s1.jpg"],
      variants: [{ color: "ابی", size: "2xl", stock: 10 }],
    },
    {
      id: "130",
      name: "پیراهن مردانه",
      price: 904000,
      discount: 287000,
      description: "پیراهن مردانه با تخفیف ویژه",
      categories: ["لباس مردانه", "پیراهن"],
      producter: "تهران",
      images: ["/assets/images/s2.jpg"],
      variants: [{ color: "آبی", size: "2xl", stock: 8 }],
    },
    {
      id: "131",
      name: "شلوار راحتی بچه گانه",
      price: 730000,
      description: "شلوار راحتی بچه گانه با طرح خاص",
      categories: ["لباس بچه گانه", "شلوار"],
      producter: "مشهد",
      images: ["/assets/images/s3.jpg"],
      variants: [{ color: "سبز", size: "2xl", stock: 12 }],
    },
    {
      id: "132",
      name: "لباس",
      price: 100000,
      description: "لباس با تخفیف ویژه 1%",
      categories: ["لباس", "orange"],
      producter: "تهران",
      images: ["/assets/images/s4.png"],
      variants: [{ color: "قرمز", size: "2xl", stock: 5 }],
    },
    {
      id: "133",
      name: "لباس مردانه",
      price: 560000,
      discount: 97000,
      description: "لباس مردانه با تخفیف 7%",
      categories: ["لباس مردانه", "orange"],
      producter: "اصفهان",
      images: ["/assets/images/s5.png"],
      variants: [{ color: "خاکستری", size: "2xl", stock: 10 }],
    },
  ]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-green-600 font-bold">
            {product.price.toLocaleString()} تومان
          </p>
        </div>
      ))}
    </div>
  );
}
