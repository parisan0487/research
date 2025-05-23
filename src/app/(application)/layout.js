import Footer from "../../component/layout/shared/footer/Footer";
import Navbar from "../../component/layout/shared/navbar/Navbar";

function ApplicationLayout({ children }) {
  return (
    <div className="px-3.5 w-full max-w-[1440px] min-w-[375px] mx-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default ApplicationLayout;
