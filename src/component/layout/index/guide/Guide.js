export default function Guide() {
  return (
    <div
      className="rounded-3xl overflow-hidden relative text-white py-16 w-full mb-10 md:mt-[-60px] mt-24 px-4 md:bg-center"
      style={{
        backgroundImage: "url('/assets/img/baner2.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-black/40 w-full h-full absolute top-0 left-0" />
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">عضویت در سایت</h2>
        <p className="mb-6 text-lg">
          با عضویت در سایت از آخرین مقالات و خبرها مطلع باشید
        </p>

        <div className="relative max-w-md mx-auto">
          <form
            dir="rtl"
            className="flex items-center bg-white rounded-xl px-4 py-1.5 shadow-md"
          >
            <input
              type="email"
              placeholder="آدرس ایمیل خود را وارد کنید"
              className="w-full pr-2 py-1.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none text-right"
            />
          </form>

          <button
            type="submit"
            className="absolute left-[4px] top-1/2 -translate-y-1/2 bg-yellow-400 text-white p-1.5 rounded-xl hover:bg-yellow-500 transition"
            aria-label="ارسال"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="white"
              stroke="currentColor"
              viewBox="0 0 32 32"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.66683 15.9791C2.66683 16.7804 3.06891 17.5816 3.87307 17.9823C6.5536 19.5848 11.6466 22.3892 15.3993 24.2587C18.616 25.8612 23.0388 27.7308 26.1215 29.0663C26.3895 29.1998 26.7916 29.3333 27.0596 29.3333C27.5957 29.3333 28.2659 29.0663 28.668 28.6656C29.3381 27.9979 29.4721 27.0631 29.2041 26.1283L26.3895 17.8487C26.2555 17.3146 25.7194 17.0475 25.1833 17.0475H18.4819C17.9458 17.0475 17.4097 16.6468 17.4097 15.9791C17.4097 15.3114 17.8118 14.9108 18.4819 14.9108H25.1833C25.7194 14.9108 26.2555 14.5102 26.3895 13.976L29.2041 5.69641C29.4721 4.89515 29.3381 3.96036 28.5339 3.29265C27.8638 2.62494 26.9256 2.4914 26.1215 2.89202C23.575 3.96036 18.75 6.09703 15.3993 7.69954C11.6466 9.56912 6.5536 12.507 3.87307 13.976C3.06891 14.3766 2.66683 15.1779 2.66683 15.9791Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
