import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Review = {
  name: string;
  date: string;
  productName: string;
  rate: number;
  message: string;
  attachments: {
    images: string[];
  };
};

export const ReviewCard = ({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <motion.div
      className="mb-4 rounded-md bg-white p-4 shadow-sm shadow-secondaryBlue"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex w-full items-start gap-1">
        <div className="flex w-[30%] flex-col items-center gap-2">
          <Image
            src="/images/icon/icon_user.png"
            alt="user"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="text-center font-medium">{review.name}</div>
        </div>
        <div className="w-[70%] flex-1">
          <div className="flex items-center gap-2">
            <div className="md:text-md flex gap-1 text-sm text-yellow-400 lg:text-lg">
              {"★".repeat(review.rate)}
            </div>
          </div>

          <div className="mb-2 text-xs text-primaryBlue">
            Date:{" "}
            {new Date(review.date).toLocaleDateString("en-BD", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <p className="text-sm text-gray-600">
            {isExpanded ? review.message : `${review.message.slice(0, 100)}...`}{" "}
            <span
              onClick={toggleReadMore}
              className="cursor-pointer text-primaryBlue hover:text-primaryDarkBlue"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {review.attachments.images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`screenshot-${idx}`}
            className="h-16 w-16 rounded object-cover"
          />
        ))}
      </div>
    </motion.div>
  );
};
