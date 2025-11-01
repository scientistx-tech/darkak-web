import React from "react";

interface SendButtonProps {
  link: () => void; 
  text: string;
}

const SendButton: React.FC<SendButtonProps> = ({ link, text }) => {
  return (
    <button
      onClick={link}
      className="group relative inline-flex items-center overflow-hidden rounded-full border-2 border-primaryBlue px-6 md:px-12 py-2 md:py-3 text-lg font-medium text-primaryBlue hover:bg-gray-50 hover:text-white"
    >
      <span className="duration-400 ease absolute left-0 top-1 md:top-1/2 block h-0 w-full bg-primaryBlue opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
      <span className="ease absolute right-0 flex h-6 w-6 md:h-10 md:w-10 translate-x-full transform items-center justify-start duration-300 group-hover:translate-x-0">
        <svg
          className="md:h-5 md:w-5 h-4 w-4"
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
      </span>
      <span className="relative text-base md:text-lg">{text}</span>
    </button>
  );
};

export default SendButton;
