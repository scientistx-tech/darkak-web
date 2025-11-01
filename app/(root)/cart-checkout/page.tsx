import React from "react";
import CartCheckout from "./CartCheckout";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Checkout"
};
export default function page() {
  return (
    <div>
      <div className="h-[65px] w-full md:h-[109px]" />
      <CartCheckout />
    </div>
  );
}
