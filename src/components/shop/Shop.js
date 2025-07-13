"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import Loading from "../shared/loading/Loading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getFinalPrice, getDiscountPercent, formatPrice } from "@/utils/Price";
import toast from "react-hot-toast";
import Fetch from "@/utils/Fetch";


export default function ProductShop({ data }) {
  const [products, setProducts] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [activeImages, setActiveImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const availableColors = ["سبز", "سفید", "مشکی", "ابی", "قرمز", "زرد"];
  const availableSizes = ["md", "lg", "xl", "2xl"];

  useEffect(() => {
    setLoading(false);
  }, []);

  const toggleSelection = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
    setCurrentPage(1);
  };

  const normalizeColor = (color) => color?.replace(/\s/g, "");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesColor =
      selectedColors.length > 0
        ? product.variants?.some((variant) =>
          selectedColors.includes(normalizeColor(variant.color))
        )
        : true;

    const matchesSize =
      selectedSizes.length > 0
        ? product.variants?.some((variant) =>
          selectedSizes.includes(variant.size)
        )
        : true;

    return matchesSearch && matchesColor && matchesSize;
  });



  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );


  const enhancedProducts = paginatedProducts.map((product) => {
    const finalPrice = getFinalPrice(product.price, product.discount);
    const discountPercent = getDiscountPercent(product.price, product.discount);

    return {
      ...product,
      finalPrice,
      discountPercent,
    };
  });



  const handleThumbnailClick = (productId, imgSrc, e) => {
    e.stopPropagation();
    setActiveImages((prev) => ({
      ...prev,
      [productId]: imgSrc,
    }));
  };

  const addToCart = async (productId) => {
    try {
      const response = await Fetch.post(
        "/api/cart/add",
        {
          productId,
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


  if (loading) return <Loading className="-top-30" />;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  const colorMap = {
    قرمز: "#f87171",
    سبز: "#4ade80",
    مشکی: "#000000",
    سفید: "#ffffff",
    ابی: "#60a5fa",
    زرد: "#fde047",
  };

  if (loading) return <div className="text-center py-10">در حال بارگذاری</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <>
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: "فروشگاه", href: "/shop" },
        ]}
      />
      <div className="flex flex-col md:flex-row px-4 py-6 gap-6">
        <div className="block md:hidden px-2 mb-4">
          <input
            type="text"
            placeholder="جست و جو کنید"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-gray-200 px-4 py-3 mb-2 rounded-lg text-right outline-0"
          />
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md w-36"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            {isMobileFilterOpen ? "بستن فیلترها" : "نمایش فیلترها"}
          </button>

          {isMobileFilterOpen && (
            <div className="bg-gray-100 mt-4 p-4 rounded-lg space-y-4">
              <div>
                <p className="text-center text-gray-700 font-bold border-b pb-1 mb-2">
                  فیلتر بر اساس رنگ
                </p>
                <div className="flex flex-wrap gap-2 justify-end">
                  {availableColors.map((color) => {
                    const isSelected = selectedColors.includes(color);
                    return (
                      <button
                        key={color}
                        onClick={() =>
                          toggleSelection(
                            color,
                            selectedColors,
                            setSelectedColors
                          )
                        }
                        className={`w-8 h-8 rounded-full border-2 ${isSelected ? "border-[#44e4d1]" : "border-gray-400"
                          }`}
                        style={{ backgroundColor: colorMap[color] }}
                      />
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-center text-gray-700 font-bold border-b pb-1 mb-2">
                  فیلتر بر اساس سایز
                </p>
                <div className="flex flex-wrap gap-2 justify-end">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded-full text-sm border ${selectedSizes.includes(size)
                        ? "bg-[#44e4d1] text-white border-[#44e4d1]"
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      onClick={() =>
                        toggleSelection(size, selectedSizes, setSelectedSizes)
                      }
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" dir="rtl">
            {enhancedProducts.map((product) => {
              const imagesArray = Array.isArray(product.images)
                ? product.images
                : [product.images];
              const mainImage = activeImages[product.id] || imagesArray[0];

              return (
                <div
                  key={product.id}
                  className="rounded-xl p-3 bg-gray-100 shadow-lg flex flex-col gap-2"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative w-full h-52 overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                      {product.discount && (
                        <span className="absolute top-2 left-2 bg-[#44e4d1] text-white text-xs px-2 py-1 rounded-md shadow-md">
                          {product.discountPercent}%
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="flex gap-1 mt-1">
                    {imagesArray.map((img, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-md overflow-hidden cursor-pointer border ${mainImage === img
                          ? "border-[#44e4d1]"
                          : "border-transparent"
                          }`}
                        onClick={(e) =>
                          handleThumbnailClick(product.id, img, e)
                        }
                      >
                        <img
                          src={img}
                          alt={`thumb-${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <Link href={`/products/${product.slug}`}>
                    <h2 className="text-center font-medium text-gray-800 cursor-pointer hover:text-[#44e4d1]">
                      {product.name}
                    </h2>
                  </Link>

                  {product.discount ? (
                    <>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <p className="line-through">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex">
                          <span className="text-black font-bold text-lg">
                            {formatPrice(product.finalPrice)}
                          </span>
                          <p className="text-gray-400 text-sm ml-1">تومان</p>
                        </div>

                        <button
                          className="bg-[#44e4d1] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#00A693]"
                          onClick={() => addToCart(product._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="34"
                            viewBox="0 0 25 24"
                            fill="none"
                            className="stroke-white group-hover:stroke-[#fff]"
                          >
                            <path
                              d="M20 9.5L19.2896 6.89465C19.0157 5.89005 18.8787 5.38775 18.5978 5.00946C18.318 4.63273 17.9378 4.34234 17.5008 4.17152C17.0619 4 16.5413 4 15.5 4M5 9.5L5.7104 6.89465C5.98432 5.89005 6.12128 5.38775 6.40221 5.00946C6.68199 4.63273 7.06216 4.34234 7.49922 4.17152C7.93808 4 8.45872 4 9.5 4"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M9.5 4C9.5 3.44772 9.94772 3 10.5 3H14.5C15.0523 3 15.5 3.44772 15.5 4C15.5 4.55228 15.0523 5 14.5 5H10.5C9.94772 5 9.5 4.55228 9.5 4Z"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M8.5 13V17"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M16.5 13V17"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M12.5 13V17"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.36425 16.4552C4.90992 18.6379 5.18275 19.7292 5.99654 20.3646C6.81032 21 7.93525 21 10.1851 21H14.8158C17.0656 21 18.1906 21 19.0044 20.3646C19.8181 19.7292 20.091 18.6379 20.6366 16.4552C21.4946 13.0234 21.9236 11.3075 21.0227 10.1538C20.1219 9 18.3532 9 14.8158 9H10.1851C6.64769 9 4.87899 9 3.97816 10.1538C3.44937 10.831 3.37879 11.702 3.58422 13"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex">
                        <span className="text-black font-bold text-lg">
                          {formatPrice(product.price)}
                        </span>
                        <p className="text-gray-400 text-sm ml-1">تومان</p>
                      </div>

                      <button
                        className="bg-[#44e4d1] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#00A693]"
                        onClick={() => addToCart(product._id)}
                        
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="34"
                          viewBox="0 0 25 24"
                          fill="none"
                          className="stroke-white group-hover:stroke-[#fff]"
                        >
                          <path
                            d="M20 9.5L19.2896 6.89465C19.0157 5.89005 18.8787 5.38775 18.5978 5.00946C18.318 4.63273 17.9378 4.34234 17.5008 4.17152C17.0619 4 16.5413 4 15.5 4M5 9.5L5.7104 6.89465C5.98432 5.89005 6.12128 5.38775 6.40221 5.00946C6.68199 4.63273 7.06216 4.34234 7.49922 4.17152C7.93808 4 8.45872 4 9.5 4"
                            strokeWidth="1.5"
                          ></path>
                          <path
                            d="M9.5 4C9.5 3.44772 9.94772 3 10.5 3H14.5C15.0523 3 15.5 3.44772 15.5 4C15.5 4.55228 15.0523 5 14.5 5H10.5C9.94772 5 9.5 4.55228 9.5 4Z"
                            strokeWidth="1.5"
                          ></path>
                          <path
                            d="M8.5 13V17"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M16.5 13V17"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12.5 13V17"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M4.36425 16.4552C4.90992 18.6379 5.18275 19.7292 5.99654 20.3646C6.81032 21 7.93525 21 10.1851 21H14.8158C17.0656 21 18.1906 21 19.0044 20.3646C19.8181 19.7292 20.091 18.6379 20.6366 16.4552C21.4946 13.0234 21.9236 11.3075 21.0227 10.1538C20.1219 9 18.3532 9 14.8158 9H10.1851C6.64769 9 4.87899 9 3.97816 10.1538C3.44937 10.831 3.37879 11.702 3.58422 13"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md text-sm border transition-all ${currentPage === page
                    ? "bg-black text-white border-black"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-3/12 hidden md:block">
          <div className="space-y-2 pb-4 ">
            <input
              type="text"
              placeholder="جست و جو کنید"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-gray-100 px-4 p-4 rounded-lg text-right outline-0"
            />
          </div>

          <div className="bg-gray-100 p-5 pb-4 rounded-2xl">
            <p className="text-lg font-bold text-center mb-4 text-gray-600 border-b">
              فیلتر بر اساس رنگ
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              {availableColors.map((color) => {
                const isSelected = selectedColors.includes(color);
                return (
                  <button
                    key={color}
                    onClick={() =>
                      toggleSelection(color, selectedColors, setSelectedColors)
                    }
                    className={`w-8 h-8 rounded-full border-2 ${isSelected ? "border-[#44e4d1]" : "border-gray-400"
                      }`}
                    style={{ backgroundColor: colorMap[color] }}
                  />
                );
              })}
            </div>
          </div>

          <div className="bg-gray-100 p-5 pb-4 mt-5 rounded-2xl">
            <h3 className="text-lg font-bold text-center mb-4 border-b text-gray-600">
              فیلتر بر اساس سایز
            </h3>
            <div className="flex flex-wrap gap-2 justify-end">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 rounded-full text-sm border ${selectedSizes.includes(size)
                    ? "bg-[#44e4d1] text-white border-[#44e4d1]"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  onClick={() =>
                    toggleSelection(size, selectedSizes, setSelectedSizes)
                  }
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}