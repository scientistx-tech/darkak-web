"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactImageMagnify from "react-image-magnify";
import { BsWhatsapp } from "react-icons/bs";
import Image from "next/image";
const ProductShow = () => {
  const product = {
    brand: "APPLE",
    name: "MacBook Pro M2 Max 14-inch 12-CPU 30-GPU",
    discount: "5%",
    price: "99,99,99 BDT",
    discountPrice: "88,88,88 BDT",
    code: "AVC1234",
    status: "In stock",
    warranty: "DARKAK 1 year warranty",
    colors: ["#000000", "#333333", "#bbbbbb"],
    storages: ["16GB/1TB", "32GB/1TB"],
    images: [
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    ],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [storage, setStorage] = useState(product.storages[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Image Section */}
        <div className="h-min rounded-md border p-2">
          <div className="relative">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.name,
                  isFluidWidth: true,
                  src: selectedImage,
                },
                largeImage: {
                  src: selectedImage,
                  width: 1200,
                  height: 1200,
                },
                enlargedImageContainerStyle: { background: "#fff", zIndex: 99 },
              }}
            />
            <div className="absolute left-0 top-6 rounded-r-full bg-secondaryBlue px-3 py-2 text-xs text-white">
              {product.discount} OFF
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((img, idx) => (
              <Image
                key={idx}
                onClick={() => setSelectedImage(img)}
                src={img}
                className={`h-16 w-16 cursor-pointer border object-cover ${selectedImage === img ? "border-primaryBlue" : ""}`}
                alt={`thumb-${idx}`}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div>
          <p className="text-sm uppercase text-[#4B4E55]">
            Brand: {product.brand}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-[#4B4E55]">
            {product.name}
          </h1>

          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-secondaryWhite px-4 py-2 text-sm text-primaryBlue line-through">
              {product.price}
            </span>
            <span className="rounded-full bg-secondaryWhite px-4 py-2 text-sm text-primaryBlue">
              {product.discountPrice}
            </span>
            <span className="rounded-full bg-secondaryWhite px-4 py-2 text-sm text-primaryBlue">
              {product.status}
            </span>
          </div>

          <p className="mt-4 inline-block rounded-full bg-secondaryWhite px-4 py-2 text-sm">
            Product Code: {product.code}
          </p>

          <a
            href="https://api.whatsapp.com/send?phone=8801711726501&text=hello%F0%9F%98%87"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-max items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700"
          >
            <BsWhatsapp className="h-5 w-5" />
            Message on Whatsapp
          </a>

          <p className="mt-6 text-lg font-semibold text-[#323232]">
            {product.warranty}
          </p>

          {/* Color */}
          <div className="mt-4 flex items-center gap-4">
            <p className="text-sm font-medium">Color: </p>
            <div className="mt-2 flex gap-3">
              {product.colors.map((clr, idx) => (
                <div
                  key={idx}
                  onClick={() => setColor(clr)}
                  className={`h-6 w-6 cursor-pointer rounded-full border-2`}
                  style={{
                    backgroundColor: clr,
                    borderColor: color === clr ? "#3b82f6" : "#ccc",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className="mt-4 flex items-center gap-4">
            <p className="text-sm font-medium">Storage:</p>
            <div className="mt-2 flex gap-3 rounded-full bg-secondaryWhite">
              {product.storages.map((stor, idx) => (
                <button
                  key={idx}
                  onClick={() => setStorage(stor)}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    storage === stor
                      ? "bg-secondaryBlue text-white"
                      : "bg-secondaryWhite text-primaryBlue"
                  }`}
                >
                  {stor}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-sm font-medium">Quantity</p>
            <div className="flex items-center overflow-hidden rounded-full border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-secondaryBlue px-4 py-1 text-white"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-secondaryBlue px-4 py-1 text-white"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="rounded-full border bg-secondaryBlue px-8 py-2 text-white transition-all duration-300 hover:border-secondaryBlue hover:bg-secondaryWhite hover:text-primaryDarkBlue"
              onClick={() => alert("Buying...")}
            >
              BUY NOW
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-secondaryBlue px-8 py-2 text-primaryDarkBlue"
              onClick={() => alert("Added to cart")}
            >
              ADD TO CART
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
