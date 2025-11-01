"use client";

import React, { useState } from "react";
import ProductBreadcrumb from "./components/ProductBreadcrumb";
import ProductShow from "./components/ProductShow";
import RelatedProductsSwiper from "./components/RelatedProductsSwiper";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-2 md:px-4">
      <ProductBreadcrumb />
      <ProductShow></ProductShow>
      <RelatedProductsSwiper />
    </div>
  );
}
