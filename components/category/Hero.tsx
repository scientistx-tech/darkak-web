import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative h-36 md:h-[300px] lg:h-[400px] xl:h-[500px] w-full">
      <Image
        src="/images/category/catHero.png"
        alt="Category image"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default Hero;
