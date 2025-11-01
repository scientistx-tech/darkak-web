"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGetUserQuery } from "@/redux/services/authApis";
import { useUpdateUserProfilePictureMutation } from "@/redux/services/userApis";

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// Components
import MenuItems from "./components/MenuItems";
import PersonalInfo from "./components/PersonalInfo";
import EditProfile from "./components/EditProfile";
import NotificationPage from "./components/NotificationPage";
import OrderHistory from "./components/OrderHistory";
import TrackOrder from "./components/TrackOrder";
import ReviewHistory from "./components/ReviewHistory";
import ReturnAndRefund from "./components/ReturnAndRefund";
import CustomerCare from "./components/CustomerCare";

const ProfilePage: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.language);

  const { data, isLoading, isError, refetch } = useGetUserQuery(undefined);
  const [updateProfilePicture] = useUpdateUserProfilePictureMutation();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    if (data?.image) {
      setImagePreview(data.image);
    }
  }, [data]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await updateProfilePicture(formData).unwrap();
      toast.success("Profile picture updated!");
      refetch();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload profile picture.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex h-[60px] w-full items-center justify-center bg-gradient-to-r from-[#00153B] to-[#00286EF2] md:h-[100px]">
        <p className="text-xl text-white md:text-2xl">{lang === 'bn' ? 'প্রোফাইল' : 'Profile'}</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-6 px-2 py-8 md:container md:mx-auto md:flex-row">
        {/* Left Sidebar */}
        <div className="flex w-full flex-col items-center gap-4 md:w-1/3">
          {/* Profile Picture */}
          <div className="relative">
            <Image
              src={imagePreview || "/default-avatar.png"}
              alt="Profile"
              width={200}
              height={200}
              className="h-[200px] w-[200px] rounded-full border-[5px] border-primaryBlue object-cover"
            />
            <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white p-2 shadow-md">
              {isUploading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
              ) : (
                <>
                  <FaCamera className="text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              )}
            </label>
          </div>

          {/* Menu */}
          <div className="w-full">
            <MenuItems setActiveTab={setActiveTab} activeTab={activeTab} />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-2/3">
          <AnimatePresence mode="wait">
            {activeTab === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PersonalInfo
                  data={data}
                  isError={isError}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
            {activeTab === "edit" && (
              <motion.div key="edit" {...animationProps}>
                <EditProfile refetch={refetch} data={data}/>
              </motion.div>
            )}
            {activeTab === "notification" && (
              <motion.div key="notification" {...animationProps}>
                <NotificationPage />
              </motion.div>
            )}
            {activeTab === "order" && (
              <motion.div key="order" {...animationProps}>
                <OrderHistory />
              </motion.div>
            )}
            {activeTab === "track" && (
              <motion.div key="track" {...animationProps}>
                <TrackOrder />
              </motion.div>
            )}
            {activeTab === "return" && (
              <motion.div key="return" {...animationProps}>
                <ReturnAndRefund />
              </motion.div>
            )}
            {activeTab === "review" && (
              <motion.div key="review" {...animationProps}>
                <ReviewHistory />
              </motion.div>
            )}
            {activeTab === "customer" && (
              <motion.div key="customer" {...animationProps}>
                <CustomerCare />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const animationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};

export default ProfilePage;
