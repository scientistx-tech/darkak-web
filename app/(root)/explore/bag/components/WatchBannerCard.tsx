'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WatchBannerCardProps {
  href: any;
  img: any;
  name: string;
  text: string;
  alt: string | undefined;
}

export default function WatchBannerCard({ href, img, name, text, alt }: WatchBannerCardProps) {
  return (
    <Link
      href={href}
      className="group relative mt-[-20px] h-[250px] w-full cursor-pointer overflow-hidden rounded-xl shadow-md md:mt-[-22px] md:h-[350px]"
    >
      {/* Background Image */}
      <Image
        src={img}
        alt={alt ?? name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute group-hover:hidden inset-0 bg-gradient-to-t from-slate-400/40 via-slate-100/20 to-transparent transition duration-500"></div>

      {/* Glassmorphism Content Box */}
      <div className="absolute bottom-4 group-hover:hidden left-4 right-4 rounded-xl bg-white/80 p-4 text-black shadow-lg backdrop-blur-md transition-all duration-500 group-hover:bottom-6">
        <h2 className="text-xl font-medium tracking-wide md:text-2xl font-serif">{name}</h2>
        <p className="mt-1 text-sm opacity-90 md:text-base">{text}</p>
      </div>

      {/* Shine Effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 transition duration-500 group-hover:opacity-10" />
    </Link>
  );
}
