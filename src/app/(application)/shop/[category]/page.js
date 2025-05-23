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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">محصولات دسته: {category}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-green-600 font-bold">
              {product.price.toLocaleString()} تومان
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
