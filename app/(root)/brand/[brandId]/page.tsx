import React from 'react';
import Page from './Component';
import getSeoData from '../../getSeoData';

export async function generateStaticParams() {
  const response = await fetch(`https://api.darkak.com.bd/api/public/brands`);
  const data = await response.json();

  return data.data.map((brand:  { title: string  }) => ({
    brandId: brand.title?.split(" ").join("-"),
  }));
}

// Fetch metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ brandId: string }> }) {
  const id = (await params).brandId;
  const response = await fetch(`https://api.darkak.com.bd/api/public/filter?brandId=${id}`);
  const data = await response.json();

  return {
    title: data?.brand?.title || '',
    openGraph: {
      title: data?.brand?.title || '',
      images: [
        {
          url: data?.data?.icon, // Update with your image URL
          width: 1200,
          height: 630,
          alt: data?.data?.title,
        },
      ],
    },
  };
}
export default function page() {
  return <Page />;
}
