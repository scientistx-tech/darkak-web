'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FaWatchmanMonitoring, FaBagShopping, FaDesktop } from 'react-icons/fa6';

export default function ExplorePage() {
  const lang = useSelector((state: RootState) => state.language.language);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const collections = [
    {
      id: 'watch',
      icon: FaWatchmanMonitoring,
      title: { en: 'Luxury Watches', bn: 'বিলাসবহুল ঘড়ি' },
      subtitle: { en: 'Timeless Elegance', bn: 'চিরন্তন কমনীয়তা' },
      gradient: 'from-amber-400 via-orange-500 to-rose-500',
      href: '/explore/watch',
      delay: '0ms',
    },
    {
      id: 'bag',
      icon: FaBagShopping,
      title: { en: 'Designer Bags', bn: 'ডিজাইনার ব্যাগ' },
      subtitle: { en: 'Elegance in Every Stitch', bn: 'প্রতিটি সেলাইয়ে খুঁজে পান রুচিশীলতা' },
      gradient: 'from-purple-400 via-pink-500 to-red-500',
      href: '/explore/bag',
      delay: '100ms',
    },
    {
      id: 'electronics',
      icon: FaDesktop,
      title: { en: 'Smart Electronics', bn: 'স্মার্ট ইলেকট্রনিক্স' },
      subtitle: { en: 'Experience the Future', bn: 'আজই অনুভব করুন ভবিষ্যৎ' },
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      href: '/explore/electronics',
      delay: '200ms',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-900 to-primaryBlue">
      

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-8 pb-8">
        {/* Animated background bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold text-white mb-6 animate-fade-in">
            {lang === 'bn' ? 'আমাদের সংগ্রহ' : 'Our Collections'}
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            {lang === 'bn'
              ? 'বিলাসিতা এবং স্টাইলের এক অনন্য সমাহার আবিষ্কার করুন'
              : 'Discover an Exquisite Blend of Luxury and Style'}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12">
            {[
              { number: '500+', label: lang === 'bn' ? 'পণ্য' : 'Products' },
              { number: '50+', label: lang === 'bn' ? 'ব্র্যান্ড' : 'Brands' },
              { number: '10K+', label: lang === 'bn' ? 'গ্রাহক' : 'Customers' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 transform hover:scale-110 transition-all"
              >
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collections */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection) => {
            const Icon = collection.icon;
            const isHovered = hoveredCard === collection.id;

            return (
              <div
                key={collection.id}
                onMouseEnter={() => setHoveredCard(collection.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
                style={{ animationDelay: collection.delay }}
              >
                <div
                  className={`
                    relative h-[500px] rounded-3xl overflow-hidden
                    transform transition-all duration-500 ease-out
                    ${isHovered ? 'scale-105 rotate-1' : 'scale-100 rotate-0'}
                    cursor-pointer
                  `}
                >
                  {/* Gradient BG */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} transition-all duration-500 ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  ></div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

                  {/* Hover Border */}
                  <div
                    className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                      isHovered ? 'ring-4 ring-white/50' : 'ring-0'
                    }`}
                  ></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-white">
                    <div
                      className={`mb-8 transform transition-all duration-500 ${
                        isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                      }`}
                    >
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-8">
                        <Icon size={80} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h2 className="text-4xl font-bold mb-3 text-center">
                      {collection.title[lang]}
                    </h2>

                    <p className="text-lg text-white/90 mb-8 text-center">
                      {collection.subtitle[lang]}
                    </p>

                    {/* Explore Button */}
                    <Link
                      href={collection.href}
                      className={`
                        relative overflow-hidden
                        bg-white text-black px-8 py-4 rounded-full
                        font-semibold text-lg
                        transform transition-all duration-300
                        ${isHovered ? 'scale-110 shadow-2xl' : 'scale-100 shadow-lg'}
                        hover:shadow-2xl
                        group/btn
                      `}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {lang === 'bn' ? 'এখনই দেখুন' : 'Explore Now'}
                        <span
                          className={`transform transition-transform duration-300 ${
                            isHovered ? 'translate-x-2' : 'translate-x-0'
                          }`}
                        >
                          →
                        </span>
                      </span>

                      <div
                        className={`
                        absolute inset-0 bg-gradient-to-r ${collection.gradient}
                        opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300
                      `}
                      ></div>
                    </Link>
                  </div>

                  {/* Shine Effect */}
                  <div
                    className={`
                    absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                    transform -skew-x-12 transition-all duration-1000
                    ${isHovered ? 'translate-x-full' : '-translate-x-full'}
                  `}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h3 className="text-4xl font-bold text-white mb-4">
            {lang === 'bn' ? 'আপনার স্টাইল খুঁজে পান' : 'Find Your Style'}
          </h3>

          <p className="text-xl text-white/80">
            {lang === 'bn'
              ? 'প্রতিটি সংগ্রহে অনন্য এবং প্রিমিয়াম পণ্য'
              : 'Unique and Premium Products in Every Collection'}
          </p>
        </div>
      </div>

      {/* Fade Animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
