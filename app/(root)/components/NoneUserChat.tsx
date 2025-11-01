"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input, Button, message as antdMessage } from "antd";
import {
  PaperClipOutlined,
  SendOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useUploadMultipleImagesPublicMutation } from "@/redux/services/userApis";
import { toast } from "react-toastify";
import { socket } from "@/socket";
import Image from "next/image";

export interface MessageFile {
  id: number;
  url: string;
  createAt: string; // ISO date string
  messageId: number;
}

export interface Message {
  id: number;
  message: string;
  senderId?: number | null;
  isReadBy: any | null; // can refine later if structure known
  conversationId: number;
  createdAt: string; // ISO date string
  read: boolean;
  message_files: MessageFile[];
}
export default function NoneUserChat({ name, conversationId }: { name: string, conversationId: number }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      message: `👋 Hello ${name}, how can We help you today?`, senderId: 1,
      conversationId: conversationId,
      createdAt: new Date().toString(),
      id: 1,
      isReadBy: null,
      message_files: [],
      read: true
    },
  ]);
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | undefined>()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadImages, { isLoading: uploading }] = useUploadMultipleImagesPublicMutation();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim() && !imagePreview) return;

    const newMessages: Message[] = [];
    try {

      if (input.trim()) {
        newMessages.push(
          {
            message: input.trim(),
            senderId: null,
            conversationId: conversationId,
            createdAt: new Date().toString(),
            id: messages?.length,
            isReadBy: null,
            message_files: [],
            read: true
          }
        );
        socket.emit("live_send_message", {
          conversationId: conversationId,
          message: input.trim(),
          files: []
        })
      }

      if (imagePreview && imageFile) {
        const imageForm = new FormData()
        imageForm.append("images", imageFile)
        const urls = await uploadImages(imageForm).unwrap()
        newMessages.push({
          message: "",
          senderId: null,
          conversationId: conversationId,
          createdAt: new Date().toString(),
          id: messages?.length,
          isReadBy: null,
          message_files: [{
            id: 1,
            createAt: new Date().toString(),
            messageId: messages?.length,
            url: urls[0]
          }],
          read: true
        });
        setImagePreview(null);
        socket.emit("live_send_message", {
          conversationId: conversationId,
          message: " ",
          files: urls
        })
      }
      setMessages((prev) => [...prev, ...newMessages]);
      setInput("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Server Error!")
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      antdMessage.error("Please select an image file");
      return;
    }
    setImageFile(file)
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    const container = bottomRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);
  const addNewMessage = (message: Message) => {
    console.log(message)
    if (conversationId !== message.conversationId)
      return
    if (message.senderId === null) {
      return
    }
    setMessages((prev) => [...prev, message]);
  }
  useEffect(() => {
    socket.on('live_receive_message', (newMessage: Message) => {
      addNewMessage(newMessage);
    });
  }, []);

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Chat Messages */}
      <div ref={bottomRef} className="flex-1 space-y-3 overflow-y-auto rounded-lg p-3 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] rounded-xl px-3 py-2 text-sm shadow-sm ${msg.senderId === null
              ? "ml-auto bg-blue-600 text-white"
              : "bg-white text-gray-800"
              }`}
          >
            {msg.message && <p>{msg.message}</p>}
            {msg.message_files?.map(d => (
              <ImageBubble key={d.id} image={d.url} isUser={msg.senderId === null} />
            ))}
          </div>
        ))}

        {/* Image Preview before sending */}
        {imagePreview && (
          <div className="mt-3 flex items-center justify-end">
            <div className="relative">
              <Image
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 rounded-lg border object-cover shadow"
              />
              
              <button
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-[2px]"
              >
                <CloseOutlined size={10} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-3 flex items-center gap-2 border-t border-gray-200 pt-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition"
        >
          <PaperClipOutlined className="text-lg" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <Input
          placeholder="Type your message..."
          size="large"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          className="flex-1"
        />
        <Button loading={uploading} disabled={uploading}
          type="primary"
          icon={<SendOutlined />}
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleSend}
        />
      </div>
    </div>
  );
}

function ImageBubble({ image, isUser }: { image: string; isUser: boolean }) {
  return (
    <div
      className={`mt-1 ${isUser ? "flex justify-end" : "flex justify-start"
        }`}
    >
      <Image
        src={image}
        alt="Sent"
        className="max-w-[150px] rounded-lg shadow-md border object-cover"
      />
    </div>
  );
}
