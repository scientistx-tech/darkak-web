import React from 'react';
import Page from './Pages';

interface Category {
  id: number;
  title: string;
  icon: string;
  serial: number;
  isActive: boolean;
  meta_title: string;
  meta_description: string;
  meta_image: string | null;
  meta_alt: string | null;
  meta_keywords: MetaKeywords | null;
  faq: Record<string, unknown> | null;
  content: string | null;
  sub_category: SubCategory[];
  sub_sub_category: SubSubCategory[];
  slug: string;
}

interface SubCategory {
  id: number;
  title: string;
  categoryId: number;
  meta_title: string;
  meta_description: string;
  meta_image: string | null;
  meta_alt: string | null;
  meta_keywords: MetaKeywords | null;
  faq: Record<string, unknown> | null;
  content: string | null;
  sub_sub_category: SubSubCategory[];
  slug: string;
}

interface SubSubCategory {
  id: number;
  title: string;
  subCategoryId: number;
  categoryId: number;
  meta_title: string;
  meta_description: string;
  meta_image: string | null;
  meta_alt: string | null;
  meta_keywords: MetaKeywords | null;
  faq: Record<string, unknown> | null;
  content: string | null;
  slug: string;
}

interface MetaKeywords {
  keywords: string[];
}

export async function generateStaticParams() {
  const response = await fetch(`https://api.darkak.com.bd/api/public/category`);
  const data = (await response.json()) as Category[];

  const params = data.flatMap((category) =>
    category.sub_category.flatMap((subCategory) =>
      subCategory.sub_sub_category.map((subSubCategory) => ({
        category: category.slug,
        subCategory: subCategory.slug,
        subSubCategory: subSubCategory.slug,
      }))
    )
  );

  return params;
}

// Fetch metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ subSubCategory: string; subCategory: string; category: string }>;
}) {
  const id = (await params).subSubCategory;
  const subCategory = (await params).subCategory;
  const category = (await params).category;
  const response = await fetch(
    `https://api.darkak.com.bd/api/public/filter?subSubCategoryId=${id}`
  );
  const data = await response.json();

  const meta = data?.subSubCategory || {};

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
      canonical: `https://darkak.com.bd/category/${category}/${subCategory}/${id}`,
    },
  };
}

export default function page() {
  return <Page />;
}
