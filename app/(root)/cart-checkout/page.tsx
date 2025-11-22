import { Metadata } from "next";
import CartCheckout from "./CartCheckout";
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
