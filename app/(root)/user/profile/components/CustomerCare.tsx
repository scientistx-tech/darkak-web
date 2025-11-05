'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdPhoneInTalk, MdMailOutline } from 'react-icons/md';
import { FaWhatsapp, FaChevronLeft } from 'react-icons/fa';
import LiveChat from './LiveChat';
import { useLazyCreateConversationQuery } from '@/redux/services/client/homeContentApi';
import { toast } from 'react-toastify';
import Button from '@/app/admin/components/Button';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function CustomerCare() {
  const lang = useSelector((state: RootState) => state.language.language);

  const [activeTab, setActiveTab] = useState('helpline');
  const [showLiveChatBox, setShowLiveChatBox] = useState(false);
  const [trigger, { data, isLoading }] = useLazyCreateConversationQuery();
  const [conversationId, setConversationId] = useState<number | null>(null);

  const createConversations = async () => {
    try {
      const res = await trigger('1').unwrap(); // '1' = receiverId or whatever param you need
      //console.log('Conversation created:', res);
      setConversationId(res.id);
      setActiveTab('livechat');
    } catch (err: any) {
      console.error('Failed to create conversation', err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white/30 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl sm:p-10">
      <h2 className="mb-10 text-center text-4xl font-extrabold text-blue-900 drop-shadow-md">
        {lang === 'bn' ? 'কাস্টমার কেয়ারে যোগাযোগ করুন' : 'Contact Customer Care'}
      </h2>

      {/* Conditionally render box-div or live chat box */}
      {!showLiveChatBox ? (
        <div>
          {/* Button Group */}
          <div className="mb-6 flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('helpline')}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'helpline'
                  ? 'bg-primaryBlue text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-primaryBlue hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'ডারকাক হেল্প লাইন' : 'Darkak Help Line'}
              <p className="text-xs font-normal">{lang === 'bn' ? '২৪/৭ দিন' : '24/7 Days'}</p>
            </button>

            <Button
              loading={isLoading}
              onClick={() => createConversations()}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'livechat'
                  ? 'bg-primaryBlue text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-primaryBlue hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'এজেন্টের সাথে লাইভ চ্যাট' : 'Live Chat with Agent'}
              <p className="text-xs font-normal">
                {lang === 'bn' ? 'প্রতিদিন সকাল ৯টা - সন্ধ্যা ৬টা' : '9 AM - 6 PM [Everyday]'}
              </p>
            </Button>
          </div>

          {/* Content Section with Animation */}
          <div className="min-h-[100px]">
            <AnimatePresence mode="wait">
              {activeTab === 'helpline' && (
                <motion.div
                  key="helpline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-gray-700"
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    📞 {lang === 'bn' ? 'যেকোনো সময় কল করুন' : 'Call Us Anytime'}
                  </h3>
                  <p>
                    {lang === 'bn'
                      ? 'আমরা ২৪/৭ আপনাকে সহায়তা করতে প্রস্তুত।'
                      : 'We are available 24/7 to support you.'}
                  </p>
                  <p className="mt-2 font-medium">
                    {lang === 'bn' ? 'হটলাইন: ০১৭১১৭২৬৫০১' : 'Hotline: 01711726501'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {lang === 'bn' ? 'ইমেইল: info@darkak.com.bd' : 'Email: info@darkak.com.bd'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {lang === 'bn'
                      ? 'ঠিকানা: উপশহর, বগুড়া - ৫৮০০'
                      : 'Address: Upashahar, Bogura - 5800'}
                  </p>

                  <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <a
                      href="tel:01711726501"
                      className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white shadow-lg transition-all hover:bg-green-700"
                    >
                      <MdPhoneInTalk /> {lang === 'bn' ? 'এখনই কল করুন' : 'Call Now'}
                    </a>
                    <a
                      href="https://wa.me/8801711726501"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2 text-white shadow-lg transition-all hover:bg-green-500"
                    >
                      <FaWhatsapp /> {lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}
                    </a>
                    <a
                      href="mailto:info@darkak.com.bd"
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white shadow-lg transition-all hover:bg-blue-700"
                    >
                      <MdMailOutline /> {lang === 'bn' ? 'আমাদের ইমেইল করুন' : 'Email Us'}
                    </a>
                  </div>
                </motion.div>
              )}

              {activeTab === 'livechat' && (
                <motion.div
                  key="livechat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-gray-700"
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    💬 {lang === 'bn' ? 'আমাদের এজেন্টের সাথে চ্যাট করুন' : 'Chat With Our Agent'}
                  </h3>
                  <p>
                    {lang === 'bn'
                      ? 'প্রতিদিন সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত উপলব্ধ।'
                      : 'Available from 9 AM to 6 PM every day.'}
                  </p>
                  <p className="mt-2 font-medium">
                    {lang === 'bn'
                      ? 'চ্যাট শুরু করতে নিচে ক্লিক করুন:'
                      : 'Click below to start chat:'}
                  </p>
                  <button
                    onClick={() => setShowLiveChatBox(true)}
                    className="mt-3 rounded-md bg-primaryBlue px-4 py-2 text-white transition-all hover:bg-blue-700"
                  >
                    {lang === 'bn' ? 'লাইভ চ্যাট শুরু করুন' : 'Start Live Chat'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div>
          {/* Live Chat Header */}
          <div className="mb-5 flex w-full items-center justify-between rounded-lg bg-primary p-3 text-white">
            <button
              onClick={() => setShowLiveChatBox(false)}
              className="flex items-center gap-2 text-lg"
            >
              <FaChevronLeft />
              {lang === 'bn' ? 'পিছনে যান' : 'Back'}
            </button>
            <p className="text-xl font-semibold">
              {lang === 'bn' ? 'লাইভ সাপোর্ট চ্যাট' : 'Live Support Chat'}
            </p>
            <div className="w-6" /> {/* Spacer */}
          </div>

          {/* Live Chat Component */}
          {conversationId && <LiveChat id={conversationId} />}
        </div>
      )}
    </div>
  );
}
