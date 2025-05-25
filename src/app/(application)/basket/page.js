import Breadcrumb from "@/component/ui/Breadcrumb";

export default function BasketPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: "سبد خرید", href: "/basket" },
        ]}
      />
      <p className="text-end">سبد خرید</p>
    </div>
  );
}
