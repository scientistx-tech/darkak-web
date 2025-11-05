"use client";
import React from "react";
import WriteReview from "../components/WriteReview";
import MyReview from "../components/MyReview";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useGetMyReviewsQuery } from "@/redux/services/client/order";

export default function ReviewPage() {
  const { data, refetch } = useGetMyReviewsQuery({
    page: 1,
    limit: 4,
  });
  return (
    <div className="w-full">
      <div className="mx-auto flex gap-2 px-2 py-8 font-medium md:container">
        <Link href="/" className="hover:text-primaryBlue">
          <FaHome className="mt-1" />
        </Link>
        <label>\</label>
        <Link href="/user/profile" className="hover:text-primaryBlue">
          Profile
        </Link>
        <label>\</label>
        <p className="text-primaryBlue">Review</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-6 px-2 py-8 md:container md:mx-auto md:flex-row">
        <div className="flex w-full flex-col items-center gap-4 md:w-1/2">
          <WriteReview refetch={refetch} />
        </div>

        <div className="w-full md:w-1/2">
          {data && <MyReview review={data.history} />}
        </div>
      </div>
    </div>
  );
}
