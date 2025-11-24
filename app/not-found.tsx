"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Img from "@/Data/Img/7938322_3814347.svg";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-full h-auto md:hidden">
        
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

          <div className="mt-10">
            <Link
              href="/"
              prefetch={false}
              className="p-3 border-2 border-primary bg-primary hover:bg-primary rounded-lg text-white hover:text-white font-semibold"
            >
             
              Home
            </Link>

            <button
              onClick={() => router.back()}
              name="back"
              className="ml-5-[9px] text-white border-2 border-primary hover:bg-primary bg-primary rounded-lg hover:text-white font-semibold"
            >
              
              Back
            </button>
          </div>
        </div>

        <div className="w-[50%] flex justify-center items-center">
          <Image height={400}  width={400} src={Img} alt="Icon"  loading="eager" sizes="(max-width: 500px) 100vw, 500px" />
        </div>
      </div>
    </div>
  );
}
