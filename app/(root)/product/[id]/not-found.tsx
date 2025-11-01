import Link from "next/link";
import { Result } from "antd";
import Img from "@/Data/Img/7938322_3814347.svg";
import Image from "next/image";

import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";

export default function NotFound() {

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="h-auto w-full md:hidden">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Link href="/">Go back</Link>}
        />
      </div>

      <div className="white hidden h-auto w-full md:flex">
        <div className="flex w-[50%] flex-col items-center justify-center">
          <p className="font-serif text-[150px] text-primary">Oops!</p>
          <p className="font-serif text-[20px] font-semibold">
            404 - PAGE NOT FOUND
          </p>
          <p className="mt-4 text-center opacity-70">
            The page you are looking for might have been remover <br /> had its
            name changed or temporarily unavailable.
          </p>

          <div className="mt-[40px]">
            <Link
              href="/"
              className="rounded-lg border-2 border-primary bg-primary p-3 font-semibold text-white hover:bg-primary hover:text-white"
            >
              <HomeOutlined className="mr-2" />
              Home
            </Link>

            
          </div>
        </div>

        <div className="flex w-[50%] items-center justify-center">
          <Image src={Img} alt="Icon" />
        </div>
      </div>
    </div>
  );
}
