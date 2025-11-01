"use client";
import React, { useRef } from "react";

const RelatedProducts: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300, // Adjust this value to control scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300, // Adjust this value to control scroll distance
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full">
     ok
    </div>
  );
};

export default RelatedProducts;
