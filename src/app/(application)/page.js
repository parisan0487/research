import Baner from "../../component/layout/index/baner/baner";
import Best from "../../component/layout/index/best/best";
import Guide from "../../component/layout/index/guide/Opinion";
import Header from "../../component/layout/index/header/Header";
import New from "../../component/layout/index/new/New";
import Offer from "../../component/layout/index/offer/Offer";

export default async function Home() {
  const res = await fetch("https://researchback.onrender.com/api/products/", {
    cache: "no-store",
  });
  const allProducts = await res.json();

  const offer = allProducts.filter((p) => p.categories?.includes("astronomy"));
  const best = allProducts.filter((p) => p.categories?.includes("life"));
  const newP = allProducts.filter((p) => p.categories?.includes("robot"));

  return (
    <div className="bg-white items-center justify-items-center min-h-screen font-kalameh font-norma">
      <Header />
      <Offer products={offer} />
      <Baner />
      <Best products={best} />
      <Guide />
      <New products={newP} />
    </div>
  );
}
