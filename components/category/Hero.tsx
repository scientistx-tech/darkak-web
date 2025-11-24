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
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      />
    </div>
  );
};

export default Hero;
