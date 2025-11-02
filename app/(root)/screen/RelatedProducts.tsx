"use client";
import React, { useRef } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import Img1 from "@/Data/Demo/product-2-1.png";
import Img2 from "@/Data/Demo/product-2-2.avif";
import Img3 from "@/Data/Demo/product-2-3.png";
import Img4 from "@/Data/Demo/product-2-4.png";

import Img5 from "@/Data/Demo/Product-banner-1.jpg";
import Img6 from "@/Data/Demo/Product-banner-2.jpg";
import Img7 from "@/Data/Demo/Product-banner-3.webp";
import Img8 from "@/Data/Demo/Product-banner-6.jpg";

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
