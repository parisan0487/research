import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div>
      <Link href={`/products/${product.slug}`}>
        <div
          className="bg-white rounded-2xl p-5 shadow-md relative text-right 
  transition-transform duration-300 ease-in-out
  hover:-translate-y-2 hover:z-10
  group "
        >
          <div className="relative w-[95%] h-56 mb-4">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          <h3 className="font-semibold text-gray-800 mb-2 text-sm">
            {product.name}
          </h3>

          {/* تخفیف و قیمت‌ها */}
          <div className="mb-2 text-sm">
            <span className="text-xs text-gray-400 line-through ml-2 block">
              {product.discount && (
                <p className="line-through mb-1 mt-3">
                  {product.discount.toLocaleString()}
                </p>
              )}
            </span>
            <div className="flex justify-between items-center">
              <button
                className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded flex items-center gap-1
        transition-colors duration-300
        group-hover:bg-blue-100 group-hover:text-blue-700
      "
              >
                <ShoppingBag
                  size={20}
                  className="transition-colors duration-300 group-hover:text-blue-700"
                />
                افزودن به
              </button>

              <span className="text-gray-800 font-bold">
                {product.price && (
                  <span className="text-white text-xs bg-[#44e4d1] px-2 py-1 rounded-md">
                    {product.price}
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">
            15٪
          </div>
        </div>
      </Link>
    </div>
  );
}
