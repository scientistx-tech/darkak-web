import React from "react";
import ProductDetails from "./ProductDetails";
import { notFound } from "next/navigation";

// Fetch metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const newsData = await getClientNewsDetailsById(id);
  const product = newsData?.product;

  return {
    title: product?.meta_title || "",
    description: product?.meta_description || "",
    keywords: product?.keywords?.map((d: any) => d.key) || [],
    openGraph: {
      title: product?.meta_title,
      description: product?.meta_description,
      images: [
        {
          url: product?.meta_image, // Update with your image URL
          width: 1200,
          height: 630,
          alt: product?.meta_title,
        },
      ],
    },
  };
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const newsData = await getClientNewsDetailsById(id);
  if (!newsData) {
    notFound();
  }
  return (
    <div className="w-full">
      <div className="h-[65px] w-full md:h-[109px]" />
      <ProductDetails data={newsData} />
    </div>
  );
}

export default Page;

async function getClientNewsDetailsById(id: string) {
  try {
    const res = await fetch(
      `https://api.darkak.com.bd/api/public/product/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: Bearer ${process.env.API_TOKEN}, // Uncomment if needed
        },
        // You must disable caching for dynamic SSR data
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch news data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching news details:", error);
    return null;
  }
}
