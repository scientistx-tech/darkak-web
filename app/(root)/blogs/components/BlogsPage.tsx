"use client"
import BlogsCart from '@/components/shared/BlogsCart';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/navigation';

interface Blog {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  name: string; // writer name
  slug: string;
}

const BlogsPage = ({ blogs, page, total }:
  { blogs: Blog[], page: number, total: number }) => {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blogs grid */}
      <div
        className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        role="status"
      >
        {blogs?.length > 0 ? (
          blogs?.map((blog) => (
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
          pageSize={10}
          total={total}
          onChange={(p) => router.push(`/blogs?page=${p}`)}
          aria-label="Blog pagination"
        />

      </div>
    </div>
  );
};

export default BlogsPage;
