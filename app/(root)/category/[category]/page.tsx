import React from 'react';
import Page from './Component';
import { slugToText } from '@/utils/urlConverter';

// Fetch metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const id = (await params).category;
  const category = (await params).category;
  const response = await fetch(`https://api.darkak.com.bd/api/public/filter?categoryId=${id}`);
  const data = await response.json();
 // console.log(data);
  const meta = data?.category || {};

  return {
    title: meta.meta_title || meta.title || '',
    description: meta.meta_description || '',
    keywords: meta.meta_keywords || '',
    openGraph: {
      title: meta.meta_title || meta.title || '',
      description: meta.meta_description || '',
      images: meta.meta_image
        ? [
            {
              url: meta.meta_image,
              width: 1200,
              height: 630,
              alt: meta.meta_alt || meta.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.meta_title || meta.title || '',
      description: meta.meta_description || '',
      images: meta.meta_image ? [meta.meta_image] : [],
    },
    alternates: {
      canonical: `https://darkak.com.bd/category/${category}`,
    },
  };
}

export default function page() {
  return <Page />;
}
