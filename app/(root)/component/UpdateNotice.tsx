"use client";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import bannerImg from "@/Data/Demo/White Brown Modern Youtube Thumbnail.png";
import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

const EidOfferNotice: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const lastShown = getLocalStorage("eid_offer_shown_date");
    const today = new Date().toISOString().split("T")[0];

    if (lastShown !== today) {
      setIsModalOpen(true);
      setLocalStorage("eid_offer_shown_date", today);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isModalOpen) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsModalOpen(false);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isModalOpen]);

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      closable={false}
      width={720}
      className="rounded-3xl modal-glow bg-opacity-60 backdrop-blur-md"
    >
      <div className="relative bg-gradient-to-br from-[#1a002a] via-[#3a005e] to-[#610086] text-white rounded-3xl overflow-hidden border border-purple-400 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/stars.gif')] bg-cover opacity-10 z-0" />
        <div className="relative z-10 text-center px-6 py-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-md"
          >
            🌙 Eid Mubarak!
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            🐐 Eid ul Adha Mega Offer!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl mt-6 font-semibold text-white"
          >
            Shop with <span className="text-yellow-300 font-bold">Darkak Mart</span> and enjoy
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg mt-2 text-gray-200"
          >
            🎁 <span className="text-yellow-400 font-bold">Flat 30% OFF</span> on all products – Eid Day Only!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg mt-4 text-green-300 font-semibold"
          >
            ⏳ Hurry, Offer ends tonight!
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="my-6"
          >
            <Image
              src={bannerImg}
              alt="Eid Offer Banner"
              className="rounded-2xl mx-auto border-4 border-yellow-400 shadow-xl"
            />
          </motion.div>

          {/* Countdown Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm mt-2 text-yellow-200"
          >
            This offer message will close in {countdown} second{countdown !== 1 ? "s" : ""}...
          </motion.p>

          <Link href="/category" passHref>
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 0 20px #ffeb3b" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(false)}
              className="mt-6 px-10 py-3 text-lg font-bold rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              🎉 Shop Now & Save Big
            </motion.button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default EidOfferNotice;
