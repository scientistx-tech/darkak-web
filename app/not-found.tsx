"use client";
import Link from "next/link";
import { Result } from "antd";
import { useRouter } from "next/navigation";

import Img from "@/Data/Img/7938322_3814347.svg";
import Image from "next/image";

import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-full h-auto md:hidden">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Link href="/">Go back</Link>}
        />
      </div>

      <div className="w-full h-auto white hidden md:flex">
        <div className="w-[50%] flex justify-center items-center flex-col">
          <p className="text-[150px] font-serif text-primary">Oops!</p>
          <p className="text-[20px] font-serif font-semibold">
            404 - PAGE NOT FOUND
          </p>
          <p className="mt-4 text-center opacity-70">
            The page you are looking for might have been remover <br /> had its
            name changed or temporarily unavailable.
          </p>

          <div className="mt-[40px]">
            <Link
              href="/"
              className="p-3 border-2 border-primary bg-primary hover:bg-primary rounded-lg text-white hover:text-white font-semibold"
            >
              <HomeOutlined className="mr-2" />
              Home
            </Link>

            <button
              onClick={() => router.back()}
              className="ml-[20px] p-[9px] text-white border-2 border-primary hover:bg-primary bg-primary rounded-lg hover:text-white font-semibold"
            >
              <ArrowLeftOutlined className="mr-2" />
              Back
            </button>
          </div>
        </div>

        <div className="w-[50%] flex justify-center items-center">
          <Image  src={Img} alt="Icon" />
        </div>
      </div>
    </div>
  );
}
