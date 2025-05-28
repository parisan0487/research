export default function Failed() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        پرداخت ناموفق بود
      </h1>
      <p className="mb-6">متأسفانه پرداخت شما انجام نشد یا لغو شد</p>
      {/* <button
        onClick={() => window.history.back()}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
      >
        بازگشت به صفحه قبلی
      </button> */}
    </div>
  );
}
