import Footer from "@/components/Layouts/root/Footer";
import FooterNav from "@/components/Layouts/root/FooterNav";
import Header from "@/components/Layouts/root/Header";
import React, { PropsWithChildren } from "react";
import FloatButton from "./components/FloatButton";

function layout({ children }: PropsWithChildren) {
  return (
      <div>
        <Header />
        <div className="w-full">{children}</div>
        <Footer />
        <div className="md:hidden">
          <FooterNav />
        </div>
        <FloatButton />
      </div>
  );
}

export default layout;
