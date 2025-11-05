"use client";

import React, { useState } from "react";
import ProductBreadcrumb from "./components/ProductBreadcrumb";
import ProductShow from "./components/ProductShow";
import RelatedProductsSwiper from "./components/RelatedProductsSwiper";
import { CustomerReviews } from "./components/CustomerReviews";
import { ProductTabs } from "./components/ProductTabs";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export default function ProductDetails({ data }: { data: any }) {
  const params = useParams();
  let slug: string = "";
  if (params?.id) {
    slug = Array.isArray(params.id) ? params.id[0] : params.id;
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;

  return (
    <div className="ml-[5%] w-[90%]">
      <ProductBreadcrumb title={data?.product?.title} url={currentUrl} />
      <ProductShow data={data} slug={slug} />
      <RelatedProductsSwiper data={data.related} />
      <div className="w-[100%] gap-6 py-10 lg:flex">
        <div className="w-full lg:w-[65%]">
          <ProductTabs data={data.product} />
        </div>
        <div className="w-full py-10 lg:w-[35%] lg:py-0">
          <CustomerReviews reviews={data?.product?.review} />
        </div>
      </div>
    </div>
  );
}
