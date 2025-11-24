import BlogsCart from '@/components/shared/BlogsCart';
import ContentFaqCard from '@/components/shared/ContentFaqCard';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { Blog } from '../types';

export default async function BlogView({ data }: { data: Blog | undefined }) {
  const blogs = await fetchBlogs(1, data?.id || 1);
  return (
    <div className="mt-10 w-full">
      {/* Back button */}
      <div className="">
        <Link
          href="/blogs"
          className="mb-6 flex items-center gap-2 text-gray-600 transition-colors hover:text-primary"
        >
          <FaArrowLeft /> Back to Blogs
        </Link>
      </div>

      {/* Hero Section */}
      <div className="w-full">
        <h1 className="mb-5 text-start text-2xl font-bold text-primaryBlue md:text-4xl">
          {data?.title}
        </h1>
        <div className="relative h-72 w-full overflow-hidden rounded-xl shadow-lg md:h-[520px]">
          <Image
            src={data?.thumbnail || ''}
            height={800}
            width={1300}
            alt="Blog Hero"
            className="h-full w-full object-cover"
            sizes="(max-width: 640px) 100vw, 1300px"
          loading="eager"
          />
        </div>
      </div>

      {/* Blog Meta */}
      <div className="mt-5 w-full">
        <div className="flex items-center justify-between border-b pb-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-400" />
            <span>{data?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <span> {data?.date && new Date(data.date).toDateString()}</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div
        className="mt-6 w-full px-4 leading-relaxed text-gray-700"
        dangerouslySetInnerHTML={{ __html: data?.description || '' }}
      />

      {/* Related Blogs */}
      <div className="mb-16 mt-12 w-full">
        <h3 className="mb-6 text-xl font-semibold text-primaryBlue md:text-2xl">More Blogs</h3>

        <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {blogs?.map((bg) => (
            <BlogsCart
              image={bg.thumbnail}
              writerName={bg.name}
              date={new Date(bg.date).toDateString()}
              title={bg.title}
              description={bg.description.replace(/<[^>]*>?/gm, '')}
              key={bg.id}
              link={`/blogs/${bg.slug}`}
            />
          ))}
        </div>
      </div>

      <div className="ml-[2.5%] mt-8 w-[95%] md:mt-16">
        <ContentFaqCard
          content={data?.content || '<p>Not Found!</p>'}
          faqs={data?.faq?.faq || []}
        />
      </div>
    </div>
  );
}

const fetchBlogs = async (page: number, blogId: number) => {
  try {
    const res = await fetch(
      `https://api.darkak.com.bd/api/public/blogs?page=${page}&limit=10&blogId=${blogId}`
    );
    const data = await res.json();
    return (data.blogs || []) as Blog[];
  } catch (err) {
    console.error('Error fetching blogs:', err);
  }
};
