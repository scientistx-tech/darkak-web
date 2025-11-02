import Link from "next/link";
import React, { ReactNode } from "react";

interface ShopNowButtonProps {
  link: string;
  text: string;
  icon?: ReactNode;
  className?: string;
}

const ShopNowButton: React.FC<ShopNowButtonProps> = ({ link, text, icon, className = "" }) => {
  return (
    <Link
      href={link}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-primaryBlue bg-primaryBlue p-4 px-6 py-2 font-medium text-indigo-600 shadow-md transition duration-300 ease-out ${className}`}
    >
      <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-primaryBlue text-white duration-300 group-hover:translate-x-0">
        {icon ? (
          icon
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        )}
      </span>
      <span className="ease absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full">
        {text}
      </span>
      <span className="invisible relative">{text}</span>
    </Link>
  );
};

export default ShopNowButton;
