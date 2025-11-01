import React, { useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

interface TypingPlaceholderInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const TypingPlaceholderInput = ({
  value,
  onChange,
}: TypingPlaceholderInputProps) => {
  const [text] = useTypewriter({
    words: ["Luxury Bag..", "Exclusive Watch..", "Explore now..."],
    loop: 0,
    delaySpeed: 1000,
  });

  return (
    <input
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      autoFocus
      type="text"
      placeholder={text}
      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-[#003084] placeholder-gray-400 shadow-sm focus:border-blue-400 focus:outline-none md:text-base"
    />
  );
};

export default TypingPlaceholderInput;
