"use client";
import React from "react";
import { Result } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const params = useSearchParams();

  let orderIds: string[] = [];
  if (params.get("orderIds")) {
    try {
      orderIds = JSON.parse(params.get("orderIds") as string);
    } catch {
      orderIds = [];
    }
  }

  const router = useRouter();

  return (
    <div className="mt-52 h-96">
      <Result
        status="success"
        title="Successfully Placed!"
        subTitle={`Order number: ${orderIds.join(", ")} Placed Successfully.`}
        extra={[
          <button
            key="buy again"
            onClick={() => {
              router.push("/");
            }}
            className="rounded-full bg-teal-400 px-6 py-2 text-white"
          >
            Buy Again
          </button>,
        ]}
      />
    </div>
  );
};

export default Page;
