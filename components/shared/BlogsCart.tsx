'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

interface BlogCardProps {
  image: string | StaticImageData;
  writerName: string;
  date: string;
  title: string;
  description: string;
  link?: string;
}

const BlogsCart: React.FC<BlogCardProps> = ({
  image,
  writerName,
  date,
  title,
  description,
  link,
}) => {
  return (
    <div className="group mx-auto w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <Link href={link ?? '#'} className="block">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden md:h-64">
          <Image
            src={image}
            alt={title}
            height={800}
            width={800}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-400" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUser className="text-gray-400" />
              <span>{writerName}</span>
            </div>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary md:text-xl">
            {title}
          </h3>

          <p className="line-clamp-3 h-[80px] text-sm text-gray-600 md:h-[100px] md:text-base">
            {description}
          </p>

          <button className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-primary/90 md:text-base">
            Read More
          </button>
        </div>
      </Link>
    </div>
  );
};

export default BlogsCart;
