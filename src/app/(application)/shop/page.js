import ProductShop from "@/component/layout/shared/Shop";

export default async function ShopPage() {
  const res = await fetch("https://researchback.onrender.com/api/products/", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <div>
      <ProductShop data={products} />
    </div>
  );
}
