'use client';

import React, { useState } from 'react';
import { notification } from 'antd';
import axios from 'axios';

import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import SendButton from '@/components/Button/SendButton';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ContactPage: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.language);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    type: 'success' | 'error' | 'warning',
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async () => {
    if (isLoading) return;
    if (!name || !email || !phone || !message) {
      openNotification('warning', 'Incomplete Form', 'Please fill out all required fields.');
      return;
    }

    if (!validateEmail(email)) {
      openNotification('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post('https://api.darkak.com.bd/api/public/contact', {
        name,
        email,
        phone,
        message,
      });

      if (res.data?.success !== false) {
        openNotification('success', 'Message Sent', 'Your message has been sent successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        openNotification('error', 'Failed', res.data?.message || 'Something went wrong.');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send message.';
      openNotification('error', 'Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {contextHolder}

      <div className="flex w-full flex-col pb-5 pt-5 md:flex-row md:pb-20 md:pt-20">
        {/* Left Section */}
        <div className="flex w-full flex-col items-start justify-center pl-[5%] md:w-[50%] md:pl-[10%]">
          <p className="mb-4 text-xl font-medium text-secondary md:text-2xl">
            <span className="text-primaryBlue"> {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}</span>{' '}
            {lang === 'bn' ? 'তথ্য' : 'Info.'}
          </p>

          <div className="mt-3 flex items-center justify-center gap-3 md:mt-5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primaryBlue md:h-[40px] md:w-[40px]">
              <FaEnvelope className="text-white md:text-xl" />
            </div>
            <p className="text-secondary md:text-xl">info@darkak.com.bd</p>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3 md:mt-5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primaryBlue md:h-[40px] md:w-[40px]">
              <FaPhoneAlt className="text-white md:text-xl" />
            </div>
            <p className="text-secondary md:text-xl">01711726501</p>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3 md:mt-5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primaryBlue md:h-[40px] md:w-[40px]">
              <FaMapMarkerAlt className="text-white md:text-xl" />
            </div>
            <p className="text-secondary md:text-xl">Upashahar , Bogura -5800</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="mt-10 flex w-full flex-col items-center rounded-md bg-white p-6 md:mt-0 md:w-[50%]">
          <p className="mb-4 text-xl font-medium text-secondary md:text-2xl">
            <>
              <span className="text-primaryBlue">{lang === 'bn' ? 'যোগাযোগ করুন' : 'Drop'}</span>{' '}
              {lang === 'bn' ? '' : 'Us a Line'}
            </>
          </p>

          {/* Name Input */}
          <div className="relative mt-3 w-[90%] md:mt-5">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              required
            />
            <label
              htmlFor="name"
              className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${name ? 'top-[-2px] bg-white px-1 text-sm text-primaryBlue' : ''}`}
            >
              {lang === 'bn' ? 'নাম' : 'Name'}
            </label>
          </div>

          {/* Email Input */}
          <div className="relative mt-3 w-[90%] md:mt-5">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              required
            />
            <label
              htmlFor="email"
              className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${email ? 'top-[-2px] bg-white px-1 text-sm text-primaryBlue' : ''}`}
            >
              {lang === 'bn' ? 'ইমেইল' : 'Email'}
            </label>
          </div>

          {/* Phone Input */}
          <div className="relative mt-3 w-[90%] md:mt-5">
            <input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              required
            />
            <label
              htmlFor="phone"
              className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${phone ? 'top-[-2px] bg-white px-1 text-sm text-primaryBlue' : ''}`}
            >
              {lang === 'bn' ? 'ফোন' : 'Phone'}
            </label>
          </div>

          {/* Message Textarea */}
          <div className="relative mt-3 w-[90%] md:mt-5">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="peer block h-[150px] w-full resize-none rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              required
            />
            <label
              htmlFor="message"
              className={`absolute left-3 top-3 text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 ${message ? 'top-[-10px] bg-white px-1 text-sm text-primaryBlue' : ''}`}
            >
              {lang === 'bn' ? 'বার্তা' : 'Message'}
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-5">
            <SendButton
              link={handleSignup}
              text={isLoading ? 'Loading...' : lang === 'bn' ? 'পাঠান' : 'Send'}
            />
          </div>
        </div>
      </div>

      {/* Map Fields */}
      <div className="tablet:mb-16 mb-8 h-auto w-full">
        <p className="mb-4 ml-10 text-xl font-medium text-secondary md:text-2xl">
          <span className="text-primaryBlue">{lang === 'bn' ? '' : 'Visit'}</span>{' '}
          {lang === 'bn' ? 'আমাদের দেখুন' : 'Us'}
        </p>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.9617163564317!2d89.35674171069608!3d24.865157094978088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc55a840699313%3A0xe2ae75d2bf57142f!2sUposhohor%20Bazar!5e0!3m2!1sen!2sbd!4v1742903838097!5m2!1sen!2sbd"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-5 rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default ContactPage;
