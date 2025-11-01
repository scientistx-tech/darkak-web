"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaComments, FaMinus, FaTimes } from "react-icons/fa";
import { Input, Button } from "antd";
import ProfileImg from "@/Data/Img/profile.jpg";
import NoneUserChat from "./NoneUserChat";
import { useCreateLiveChatMutation, useGetLiveChatStatusQuery } from "@/redux/services/liveChatApis";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Loader from "@/components/shared/Loader";
function generateRefToken(prefix = "REF") {
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
}
const WHATSAPP_LINK =
  "https://api.whatsapp.com/send?phone=8801711726501&text=Hello 👋";

export default function FloatButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { data: liveChatStatus } = useGetLiveChatStatusQuery()
  const [createChat, { isLoading: chatCreating }] = useCreateLiveChatMutation()
  const [conversationId, setConversationId] = useState<number | undefined>()
  const isToken = Cookies.get("live_session")


  const handleStartChat = async () => {
    if (!name.trim() || !email.trim()) {
      toast.info("Please fill all fields");
      return;
    }
    try {
      let token;
      if (!isToken) {
        token = generateRefToken()
        Cookies.set("live_session", token)
      } else {
        token = isToken
      }

      const result = await createChat({
        name: name,
        phone: email,
        token: token
      }).unwrap()
      setConversationId(result.id)
      setIsFormOpen(false);
      setIsChatOpen(true);
    } catch (error: any) {
      toast.error(error?.data?.message || "Unknown Error")
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setIsMinimized(false);
  };

  const handleMinimizeChat = () => {
    setIsMinimized(true);
    setIsChatOpen(false);
  };

  const handleReopenChat = () => {
    setIsMinimized(false);
    setIsChatOpen(true);
  };

  return (
    <>
      {/* Floating Buttons */}
      <div
        className="fixed bottom-8 right-6 z-50 flex flex-col items-end"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Options */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="mb-3 flex flex-col items-end gap-2"
            >
              {liveChatStatus && liveChatStatus.status ? (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700"
                >
                  <FaComments />
                  Live Chat
                </button>
              ) : null}

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-green-600"
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Icon */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer rounded-full border-2 border-primary shadow-lg"
        >
          <Image
            src={ProfileImg}
            alt="Support Agent"
            width={60}
            height={60}
            className="h-[60px] w-[60px] rounded-full border-2 border-white shadow-lg"
          />
          <span className="absolute right-0 top-0 h-3 w-3 animate-ping rounded-full border-2 border-white bg-green-500"></span>
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
        </motion.div>
      </div>

      {/* 1️⃣ Name & Email Form Modal (Floating) */}
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-6 z-[60] w-[320px] rounded-xl bg-white p-5 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primaryBlue">
              Start Live Chat
            </h2>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="large"
            />
            <Input
              placeholder="Phone No"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              type="number"
            />
            <Button loading={chatCreating}
              disabled={chatCreating}
              type="primary"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleStartChat}
              size="large"
            >
              Start Chat
            </Button>
          </div>
        </motion.div>
      )}

      {/* 2️⃣ Floating Chat Modal */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-6 z-[70] flex h-[420px] w-[340px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-2 text-white">
            <span className="font-medium">
              Chat with Support ({name})
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleMinimizeChat}
                className="hover:text-yellow-300"
              >
                <FaMinus />
              </button>
              <button
                onClick={handleCloseChat}
                className="hover:text-red-300"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {conversationId ? (<NoneUserChat conversationId={conversationId} name={name} />)
              :
              (<Loader />)}

          </div>
        </motion.div>
      )}

      {/* 3️⃣ Minimized Chat Button */}
      {isMinimized && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          onClick={handleReopenChat}
          className="fixed bottom-6 right-6 z-[80] flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg cursor-pointer hover:bg-blue-700"
        >
          <FaComments />
          Continue Chat
        </motion.div>
      )}
    </>
  );
}
