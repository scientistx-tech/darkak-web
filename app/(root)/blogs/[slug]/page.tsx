import React from 'react';
import BlogView from './BlogView';
import { Blog } from '@/app/admin/blog/type';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const id = (await params).slug;
  const newsData = await fetchBlogs(id);
  const product = newsData;

  return {
    title: product?.meta_title || '',
    description: product?.meta_description || '',
    keywords: product?.meta_keywords.keywords?.map((d: any) => d.key) || [],
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
export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const id = (await params).slug;
  const data = await fetchBlogs(id);
  return (
    <div>
      <div className="h-[65px] w-full md:h-[109px]" />

      <div className="container mx-auto flex flex-col gap-y-5 px-2 md:px-4">
        <BlogView data={data} />
      </div>
    </div>
  );
}

const fetchBlogs = async (slug: string) => {
  try {
    const res = await fetch(`https://api.darkak.com.bd/api/public/blog/${slug}`);
    const data = await res.json();
    return data as Blog;
  } catch (err) {
    console.error('Error fetching blogs:', err);
  }
};
