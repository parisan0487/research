import Baner from "../../components/home/index/baner/baner";
import Best from "../../components/home/index/best/best";
import Guide from "../../components/home/index/guide/Opinion";
import Header from "../../components/home/index/header/Header";
import New from "../../components/home/index/new/New";
import Offer from "../../components/home/index/offer/Offer";

export default async function Home() {
  const res = await fetch("https://researchback.onrender.com/api/products/", {
    cache: "no-store",
  });
  const allProducts = await res.json();

  const offerProducts = allProducts.filter((p) => p.categories?.includes("offer"));
  const bestProducts = allProducts.filter((p) => p.categories?.includes("life"));
  const newProducts = allProducts.filter((p) => p.categories?.includes("robot"));

  return (
    <div className="bg-white items-center justify-items-center min-h-screen font-kalameh">
      <Header />
      <Offer products={offerProducts} />
      <Baner />
      <Best products={bestProducts} />
      <Guide />
      <New products={newProducts} />
    </div>
  );
}
