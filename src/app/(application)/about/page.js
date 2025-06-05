import Breadcrumb from "@/components/ui/Breadcrumb";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: "درباره ما", href: "/about" },
        ]}
      />

      <div
        className="flex gap-8 p-8 bg-gradient-to-t from-[#44e4d1] to-[#56bbaf] rounded-4xl overflow-hidden"
        dir="rtl"
      >
        <div className="xl:w-1/2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl text-white font-bold">
              درباره فروشگاه صنایع دستی
            </h2>
          </div>
          <p className="text-white font-medium leading-8">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد.
          </p>
          <Link
            href="/shop"
            className="w-max flex items-center gap-2 text-lg bg-white text-green-500 font-medium py-2.5 px-4 rounded-xl"
          >
            بازدید از فروشگاه ما
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="9">
                <path
                  id="Union"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.5713 3.42859H6.857V3.42882L6.857 3.42881L3.50628 6.79171L8.42978 11.6974L3.69217 15.5605V20.5714H8.43942V11.707L17.1937 20.4295L20.5444 17.0666L11.6213 8.17584H20.5713V3.42859Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </Link>
        </div>

        {/* <div className="w-1/2 -mb-16 hidden xl:flex"></div> */}
      </div>
    </>
  );
}
