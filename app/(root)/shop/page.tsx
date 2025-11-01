import React from "react";
import ShopPage from "./ShopPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shop"
};
function page() {
  return (
    <div className="w-full">
      <div className="h-[65px] md:h-[109px] w-full"/>
      <ShopPage />
    </div>
  );
}

export default page;
