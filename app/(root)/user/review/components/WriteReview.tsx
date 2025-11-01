"use client";

import React, { useState } from "react";
import { FaStar, FaUpload, FaTimes, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAddReviewCreateMutation } from "@/redux/services/client/order";
import { useGetUserQuery } from "@/redux/services/authApis";
import { Review } from "@/types/client/createReviewTypes";
import {
  useUploadMultipleImagesMutation,
  useUploadVideosMutation,
} from "@/redux/services/userApis";

export default function WriteReview({ refetch }: { refetch: () => void }) {
  const { data } = useGetUserQuery(undefined);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  console.log("imageURLs", imageURLs);
  
  const [video, setVideo] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);

  const params = useParams();
  const productId = params.id;

  const [addReview, { isLoading }] = useAddReviewCreateMutation();
  const [uploadImages] = useUploadMultipleImagesMutation();
  const [uploadVideos] = useUploadVideosMutation();

  const handleStarClick = (index: number) => setRating(index);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    let tempImages: File[] = [...images];
    let tempVideo = video;
    let errorMessage = "";

    const newImages: File[] = [];
    let newVideo: File | null = null;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        if (tempImages.length + newImages.length < 5) {
          newImages.push(file);
        } else {
          errorMessage = "You can upload maximum 5 images & 1 video.";
        }
      } else if (file.type.startsWith("video/")) {
        if (!tempVideo && !newVideo) {
          newVideo = file;
        } else {
          errorMessage = "Only 1 video allowed.";
        }
      }
    });

    // Upload images
    if (newImages.length > 0) {
      setImageUploading(true);
      try {
        const formData = new FormData();
        newImages.forEach((img) => formData.append("images", img));
        const res: any = await uploadImages(formData).unwrap();
        
        const uploadedURLs = res || [];

        setImages((prev) => [...prev, ...newImages]);
        setImageURLs((prev) => [...prev, ...uploadedURLs]);
      } catch (err) {
        toast.error("Image upload failed");
      }
      setImageUploading(false);
    }

    // Upload video
    if (newVideo) {
      setVideoUploading(true);
      try {
        const formData = new FormData();
        formData.append("videos", newVideo);
        const res: any = await uploadVideos(formData).unwrap();
        // console.log(res);

        const videoUploadedURL = res;
        if (videoUploadedURL) {
          setVideo(newVideo);
          setVideoURL(videoUploadedURL);
        }
      } catch (err) {
        toast.error("Video upload failed");
      }
      setVideoUploading(false);
    }

    if (errorMessage) setUploadError(errorMessage);
    else setUploadError(null);

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageURLs((prev) => prev.filter((_, i) => i !== index));
    if (uploadError && images.length - 1 < 5) setUploadError(null);
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    setVideoURL(null);
    if (uploadError) setUploadError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    const payload: Review = {
      name,
      message,
      rate: rating,
      userId: data?.id,
      productId: productId as any,
      attachments: {
        images: imageURLs,
        videos: videoURL ? [videoURL] : [],
      },
    };

    try {
      await addReview(payload).unwrap();
      toast.success("Review submitted successfully!");
      // Reset form
      setRating(0);
      setName("");
      setMessage("");
      setImages([]);
      setImageURLs([]);
      setVideo(null);
      setVideoURL(null);
      refetch();
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
        Write a Review
      </h2>

      {/* Rating */}
      <div className="mb-6 text-center">
        <p className="mb-2 text-lg font-semibold text-gray-600">Rating:</p>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <FaStar
              key={index}
              className={`h-8 w-8 cursor-pointer transition ${
                (hoverRating || rating) >= index
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => setHoverRating(index)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>

      {/* Upload */}
      <div className="mb-4 flex flex-col items-center">
        <label
          htmlFor="upload"
          className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-primaryBlue hover:bg-blue-50"
        >
          <FaUpload className="h-6 w-6 text-gray-400" />
          <p className="mt-1 text-xs text-gray-400">Picture/Video</p>
        </label>
        <input
          id="upload"
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {uploadError && (
        <div className="mb-4 text-center text-xs text-red-500">
          {uploadError}
        </div>
      )}

      {/* Previews */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <Image
              src={URL.createObjectURL(img)}
              alt="preview"
              height={100}
              width={100}
              className="rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          </div>
        ))}
        {video && (
          <div className="relative">
            <video
              src={URL.createObjectURL(video)}
              className="h-20 w-20 rounded-lg object-cover"
              controls
            />
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          </div>
        )}
        {(imageUploading || videoUploading) && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FaSpinner className="animate-spin" />{" "}
            <span>Uploading {imageUploading ? "images" : "video"}...</span>
          </div>
        )}
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name (Public)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-primaryBlue focus:outline-none"
        />
        <textarea
          placeholder="Your Review goes here..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-primaryBlue focus:outline-none"
        ></textarea>

        <p className="pt-2 text-xs leading-relaxed text-gray-400">
          By submitting your review, you agree to our terms, privacy and content
          policies.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            href="/profile"
            className="flex w-32 items-center justify-center rounded-full border border-primaryBlue py-2 text-primaryBlue transition hover:bg-primaryBlue hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading || imageUploading || videoUploading}
            className={`w-32 rounded-full py-2 text-white transition ${
              isLoading || imageUploading || videoUploading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-primaryBlue hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
