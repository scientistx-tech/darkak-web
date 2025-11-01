"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { PaginatedProducts } from "@/types/client/myReviewsTypes";

const MyReview: React.FC<{ review: PaginatedProducts }> = ({ review }) => {
  const data = review.data
  const reviewedProducts = data.filter(
    (product) => product.review && product.review.length > 0,
  );

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-primaryBlue md:text-2xl">
        My Reviews
      </h2>

      {reviewedProducts.length === 0 ? (
        <p className="mt-4 text-gray-500">
          You haven&apos;t reviewed any products yet.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {reviewedProducts.map((product) => {
            const review = product.review![0]; // Show only the first review for each product
            return (
              <div
                key={review.id}
                className="flex w-full items-center justify-between rounded-xl border bg-white p-4 shadow-lg transition hover:shadow-xl xl:w-[80%]"
              >
                <Image
                  src={product.thumbnail}
                  height={80}
                  width={80}
                  alt={product.title}
                  className="rounded-lg"
                />

                <div className="w-[70%] px-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar
                          key={index}
                          className={`${
                            index < review.rate
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">{review.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default MyReview;