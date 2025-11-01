'use client';

import React, { useState, useEffect } from 'react';
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { FaQuoteLeft } from 'react-icons/fa';
import { Button } from 'antd';
import { Review } from '../types';

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    name: 'Tasnim Akash, Dhaka',
  },
  {
    id: 2,
    rating: 4,
    text: "Amazing experience with the watch collection. Beautiful and long-lasting. I'd highly recommend!",
    name: 'Shakib Hossen, Chattogram',
  },
  {
    id: 3,
    rating: 3,
    text: 'This is the best watch I’ve ever purchased. Looks elegant and runs smoothly.',
    name: 'Promy, Sylhet',
  },
];

export default function WatchTestimonial({ review }: { review: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === review.length - 1 ? 0 : prevIndex + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? review.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 7000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (value: number) => {
    return (
      <div className="flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xl ${i < value ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex w-full items-center justify-center from-blue-100 via-white to-blue-100 px-4 py-16 md:bg-gradient-to-r">
      {/* Glass Card */}
      <div className="relative w-full max-w-3xl rounded-2xl border border-blue-200 bg-white/60 px-8 py-12 shadow-xl backdrop-blur-md transition-all duration-500">
        {/* Quote icon */}
        <FaQuoteLeft className="absolute -top-6 left-12 text-5xl text-primary opacity-90" />

        {/* Star rating */}
        {renderStars(review[currentIndex].rate)}

        {/* Testimonial text */}
        <p className="mt-4 text-center text-lg font-medium text-gray-700 transition-all duration-500 ease-in-out md:h-[70px]">
          {review[currentIndex].message}
        </p>

        {/* Name */}
        <p className="mt-3 text-center text-xl font-semibold text-[#1B1464]">
          {review[currentIndex].name}
        </p>

        {/* Navigation buttons */}
        <div className="mt-4 flex justify-center gap-6">
          <button
            onClick={prevTestimonial}
            className="text-3xl text-[#1B1464] transition hover:scale-110 hover:text-blue-600"
          >
            <LeftCircleOutlined />
          </button>
          <button
            onClick={nextTestimonial}
            className="text-3xl text-[#1B1464] transition hover:scale-110 hover:text-blue-600"
          >
            <RightCircleOutlined />
          </button>
        </div>

        {/* Button */}
        <div className="mt-5 flex justify-center">
          <Button
            type="primary"
            className="rounded-full !bg-[#1B1464] px-8 py-2 font-bold text-white shadow-md hover:!bg-blue-700"
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </div>
  );
}
