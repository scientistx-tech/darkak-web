import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Poster } from '../types';

export default function WatchPoster({ poster }: { poster: Poster | undefined }) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center justify-between gap-4 p-[5%] md:h-[210px] md:flex-row">
        <div className="hidden w-1/3 md:block">
          <div className="absolute mt-[-30px] w-[250px] border-[10px] border-slate-100 md:h-[250px]">
            {poster && (
              <Image
                src={poster.top_image}
                alt={poster.top_alt}
                fill
                className="duration-50 object-cover transition-opacity"
              />
            )}
          </div>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center md:w-1/2 md:items-end md:justify-end">
          <p className="font-serif text-2xl font-medium text-primaryBlue md:text-[40px]">
            {poster?.top_title}
          </p>

          <p className="mt-5 text-slate-800 md:text-right">{poster?.top_description}</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center md:hidden">
        {poster && (
          <Image
            src={poster?.poster_image}
            alt={poster?.poster_alt}
            width={1200}
            height={800}
            className="absolute mt-[180px] h-[200px] w-[200px] border-[7px] border-slate-100"
          />
        )}
      </div>

      <div className="mt-[100px] flex w-full flex-col items-center justify-between gap-4 bg-black p-[5%] md:mt-0 md:h-[400px] md:flex-row">
        <div className="mt-[120px] flex h-full w-full flex-col items-start justify-end md:mt-0 md:w-1/2">
          <p className="font-serif text-xl font-medium text-white md:text-[35px]">
            {poster?.poster_title}
          </p>

          <p className="mt-5 text-slate-200">{poster?.poster_description}</p>

          <Link
            href={`/product/${poster?.product?.slug}`}
            className="mt-5 inline-block rounded-full border border-white px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Explore Now
          </Link>
        </div>

        <div className="w-full md:w-1/3">
          {poster && (
            <Image
              src={poster?.poster_image}
              alt={poster?.poster_alt}
              width={1200}
              height={800}
              className="h-[300px] w-full md:h-[400px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
