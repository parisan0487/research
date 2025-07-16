import { MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="rounded-3xl overflow-hidden text-white mt-10 text-base"
      style={{
        backgroundImage: "url('/assets/img/footer.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/60 p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-right text-[16px] leading-loose">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/assets/img/footer-logo.svg"
                alt="لوگو"
                width={60}
                height={60}
              />
              <h2 className="text-2xl font-bold">فروشگاه صنایع دستی</h2>
            </div>
            <p className="text-gray-200 mb-4">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
              استفاده از طراحان گرافیک است.
            </p>
            <p className="text-[#56bbaf] font-semibold mb-2">
              نماد اعتماد الکترونیک
            </p>
            <div className="flex gap-4">
              <div className="rounded-md bg-white w-[60px] h-[60px] flex items-center justify-center text-black text-sm font-semibold">
                <Image
                  src="/assets/img/inamad.png"
                  alt="لوگو"
                  width={65}
                  height={65}
                />
              </div>
              <div className="rounded-md bg-white p-2 w-[60px] h-[60px] flex items-center justify-center text-black text-sm font-semibold">
                <Image
                  src="/assets/img/ethadie.png"
                  alt="لوگو"
                  width={65}
                  height={65}
                />
              </div>
            </div>
          </div>

          {/* لینک‌ها */}
          <div className="md:col-start-3">
            <h3 className="text-[#44e4d1] font-semibold mb-3 text-lg">
              لینک‌های مفید
            </h3>
            <ul className="space-y-2 text-gray-300 text-base">
              <li>
                <a
                  href="/shop/handmade-jewelry"
                  className="hover:text-[#56bbaf] transition"
                >
                  زیورآلات دست ساز
                </a>
              </li>
              <li>
                <a
                  href="/shop/wooden-handicrufts"
                  className="hover:text-[#56bbaf] transition"
                >
                  صنایع دستی چوبی
                </a>
              </li>
              <li>
                <a
                  href="/shop/clay-crafts"
                  className="hover:text-[#56bbaf] transition"
                >
                  صنایع دستی سفالی
                </a>
              </li>
              <li>
                <a
                  href="/shop/metal-crafts"
                  className="hover:text-[#56bbaf] transition"
                >
                  صنایع دستی فلزی
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#44e4d1] font-semibold mb-3 text-lg">
              خدمات مشتریان
            </h3>
            <ul className="space-y-2 text-gray-300 text-base">
              <li>
                <a href="/contact" className="hover:text-[#56bbaf] transition">
                  مرکز پشتیبانی
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#56bbaf] transition">
                  قوانین و مقررات
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#56bbaf] transition">
                  حریم خصوصی
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#56bbaf] transition">
                  راهنمای خرید
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#44e4d1] font-semibold mb-3 text-lg">
              درباره سایت
            </h3>
            <ul className="space-y-2 text-gray-300 text-base">
              <li>
                <a href="/about" className="hover:text-[#56bbaf] transition">
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#56bbaf] transition"
                >
                  تماس با ما
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#56bbaf] transition">
                  چرا سایت ما
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#56bbaf] transition">
                  راهنمای خرید
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-gray-300  pt-4 mt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-gray-100 text-sm gap-6">
          <div className="flex flex-wrap gap-6 font-bold items-center">
            <div className="flex items-center gap-2">
              <span className="text-[#44e4d1] text-lg">
                <PhoneCall />
              </span>
              <span>09119874731 - 09121324567</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#44e4d1] text-lg">
                <MapPin />
              </span>
              <span>کاشمر, خیابان امام</span>
            </div>
          </div>
          <p className="text-gray-300 text-xs font-semibold text-left">
            © طراحی و توسعه سایت : پریسان غلامی
          </p>
        </div>
      </div>
    </footer>
  );
}
