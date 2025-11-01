import React from "react";
import MoreProduct from "../MoreProduct";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products"
};
export default function page() {
  return (
    <div>
      <MoreProduct />
    </div>
  );
}
