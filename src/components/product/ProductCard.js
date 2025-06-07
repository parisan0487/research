import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getFinalPrice, getDiscountPercent, formatPrice } from "@/utils/Price";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";

export default function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      const response = await Fetch.post(
        "/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          token: true,
        }
      );
      toast.success("محصول با موفقیت به سبد خرید اضافه شد");
    } catch (err) {
      toast.error("خطا در افزودن محصول به سبد خرید");
    }
  };

  return (
    <div>
      <div
        className="bg-white rounded-2xl p-5 shadow-md relative text-right 
        transition-transform duration-300 ease-in-out
        hover:-translate-y-2 hover:z-10
        group"
      >
        <div className="relative w-[95%] h-56 mb-4">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
            />


            <div className="absolute top-2 left-2">
              {product.discount > 0 ? (
                <span className="bg-[#44e4d1] text-white text-xs px-2 py-1 rounded-md">
                  {getDiscountPercent(product.price, product.discount)}٪
                </span>
              ) : (
                <span className="invisible text-xs px-2 py-1 rounded-md">
                  ۰۰٪
                </span>
              )}
            </div>
          </Link>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 mb-2 text-sm">
            {product.name}
          </h3>
        </Link>

        {product.discount > 0 ? (
          <p className="line-through text-gray-400 text-sm mt-5">
            {formatPrice(product.price)} تومان
          </p>
        ) : (
          <p className="invisible text-sm mb-1">_</p>
        )}

        <div className="flex justify-between items-center">
          <button
            className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded flex items-center gap-1
            transition-colors duration-300
            group-hover:bg-blue-100 group-hover:text-blue-700"
            onClick={() => addToCart(product._id)}
          >
            <ShoppingBag
              size={20}
              className="transition-colors duration-300 group-hover:text-blue-700"
            />
            افزودن به
          </button>


          <p className="font-bold text-gray-800 text-sm">
            {formatPrice(
              product.discount > 0
                ? getFinalPrice(product.price, product.discount)
                : product.price
            )}{" "}
            تومان
          </p>
        </div>
      </div>
    </div >
  );
}
