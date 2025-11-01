'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Pagination } from 'antd';

// Dynamic imports for better performance
const BlogsCart = dynamic(() => import('@/components/shared/BlogsCart'), {
  loading: () => <p>Loading...</p>,
});
const Loader = dynamic(() => import('@/components/shared/Loader'));

interface Blog {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  name: string; // writer name
  slug: string;
}

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  // ✅ useCallback to stabilize function and fix ESLint warning
  const fetchBlogs = useCallback(async (page: number) => {
    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.darkak.com.bd/api/public/blogs?page=${page}&limit=${limit}`,
        { signal, cache: 'force-cache' }
      );

      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();

      setBlogs(data.blogs || []);
      setTotal(data.total || 0);
    } catch (err) {
      if ((err as any).name !== 'AbortError') {
        console.error('Error fetching blogs:', err);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [limit]);

  // ✅ useEffect dependency fixed
  useEffect(() => {
    fetchBlogs(page);
  }, [page, fetchBlogs]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blogs grid */}
      <div
        className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        aria-busy={loading}
        role="status"
      >
        {loading ? (
          <Loader />
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogsCart
              key={blog.id}
              link={`/blogs/${blog.slug}`}
              image={blog.thumbnail}
              writerName={blog.name}
              date={new Date(blog.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              title={blog.title}
              description={blog.description.replace(/<[^>]*>?/gm, '')} // strip HTML
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No blogs found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          showSizeChanger={false}
          onChange={(p) => setPage(p)}
          aria-label="Blog pagination"
        />
      </div>
    </div>
  );
};

export default BlogsPage;
