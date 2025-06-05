import Image from "next/image";
import Link from "next/link";

export default function Baner() {
  return (
    <div className="w-full h-auto bg-gray-100 mb-16 rounded-2xl mt-32 md:mt-10 bg-[url(/assets/img/vector-3.svg)] bg-no-repeat bg-bottom-right">
      <div className="flex flex-col xl:flex-row items-center xl:items-stretch">
        <div className="flex justify-center xl:items-center">
          <div className="-mt-[5rem] -mb-[5rem]">
            <Image
              src="/assets/img/carpet.png"
              alt="قالی ایرانی"
              width={350}
              height={520}
              className="ml-9"
            />
          </div>
        </div>

        <div className="relative z-10 w-full md:w-2/3 text-center xl:text-right pt-10 px-6 xl:mt-3 mt-16">
          <h1 className="text-lg md:text-3xl font-bold text-gray-800 leading-relaxed">
            با <span className="text-black">قالی دستباف ایرانی</span>،{" "}
            <span className="text-black">هنر اصیل ایرانی</span> را مهمان خانه
            خود کنید
          </h1>

          <div className="mt-8 flex items-center justify-center gap-7 mb-8 xl:ml-28 flex-wrap sm:flex-nowrap">
            <Link href="/shop">
              <button className="bg-yellow-400 hover:bg-emerald-300 text-white px-4 py-1.5 text-sm md:px-5 md:py-2 md:text-base rounded-lg shadow transition">
                مشاهده فروشگاه
              </button>
            </Link>
            <button className="text-emerald-700 text-sm md:text-lg pointer-events-none">
              ...همین حالا خرید کنید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
