import Baner from "../../component/layout/index/baner/baner";
import Best from "../../component/layout/index/best/best";
import Guide from "../../component/layout/index/guide/Guide";
import Header from "../../component/layout/index/header/Header";
import New from "../../component/layout/index/new/New";
import Offer from "../../component/layout/index/offer/Offer";

export default function Home() {
  return (
    <div className="bg-white items-center justify-items-center min-h-screen font-kalameh font-norma">
      <Header />
      <Offer />
      <Baner />
      <Best />
      <Guide />
      <New />
    </div>
  );
}
