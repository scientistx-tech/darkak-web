"use client";
import Loader from "@/components/shared/Loader";
import ProfileImg from "@/Data/Img/profile.jpg";
import { useCreateLiveChatMutation, useGetLiveChatStatusQuery } from "@/redux/services/liveChatApis";
import { Button, Input } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState } from "react";
import { FaComments, FaMinus, FaTimes, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import NoneUserChat from "./NoneUserChat";
import Link from "next/link";
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

        {isHovered && (
          <div
            className="mb-3 flex flex-col items-end gap-2"
          >
            {liveChatStatus && liveChatStatus.status ? (
              <button
                name="liveChat"
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700"
              >
                <FaComments />
                Live Chat
              </button>
            ) : null}

            <Link
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-green-600"
            >
              <FaWhatsapp />
              WhatsApp
            </Link>
          </div>
        )}


        {/* Main Floating Icon */}

        <div
          className="relative cursor-pointer rounded-full border-2 border-primary shadow-lg"
        >
          <Image
            src={ProfileImg}
            alt="Support Agent"
            width={60}
            height={60}
            loading="eager"
            sizes="(max-width: 60px) 100vw, 60px"
            className="h-[60px] w-[60px] rounded-full border-2 border-white shadow-lg"
          />
          <span className="absolute right-0 top-0 h-3 w-3 animate-ping rounded-full border-2 border-white bg-green-500"></span>
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
        </div>
      </div>

      {/* 1️⃣ Name & Email Form Modal (Floating) */}
      {isFormOpen && (

        <div
          className="fixed bottom-20 right-6 z-60 w-[320px] rounded-xl bg-white p-5 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primaryBlue">
              Start Live Chat
            </h2>
            <button
              name="closeForm"
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
              name="startChat"
              type="primary"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleStartChat}
              size="large"
            >
              Start Chat
            </Button>
          </div>
        </div>
      )}

      {/* 2️⃣ Floating Chat Modal */}
      {isChatOpen && (
        <div
          className="fixed bottom-4 right-6 z-70 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-2 text-white">
            <span className="font-medium">
              Chat with Support ({name})
            </span>
            <div className="flex gap-2">
              <Button
                name="minimizeChat"
                onClick={handleMinimizeChat}
                className="hover:text-yellow-300"
              >
                <FaMinus />
              </Button>
              <Button
                onClick={handleCloseChat}
                className="hover:text-red-300"
              >
                <FaTimes />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {conversationId ? (<NoneUserChat conversationId={conversationId} name={name} />)
              :
              (<Loader />)}

          </div>
        </div>
      )}

      {/* 3️⃣ Minimized Chat Button */}
      {isMinimized && (
        <div
          onClick={handleReopenChat}
          className="fixed bottom-6 right-6 z-80 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg cursor-pointer hover:bg-blue-700"
        >
          <FaComments />
          Continue Chat
        </div>
      )}
    </>
  );
}
