import Footer from "@/components/Layouts/root/Footer";
import FooterNav from "@/components/Layouts/root/FooterNav";
import { PropsWithChildren } from "react";
import Header from "@/components/Layouts/root/Header";
import FloatButton from "./components/FloatButton";

function layout({ children }: PropsWithChildren) {
  return (
      <div>
       <Header />
        <div className="w-full bg-gray-100">{children}</div>
        <Footer />
        <div className="md:hidden">
          <FooterNav />
        </div>
        <FloatButton />
      </div>
  );
}

export default layout;