import ProductShop from "@/component/layout/shared/Shop";

async function getProductsByCategory(category) {
  const res = await fetch(
    `https://researchback.onrender.com/api/products/category/${category}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("خطا در دریافت محصولات");
  }

  return res.json();
}

export default async function CategoryPage({ params }) {
  const category = params.category;

  const products = await getProductsByCategory(category);

  return <ProductShop data={products} />;
}
