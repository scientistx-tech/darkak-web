'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendButton from '@/components/Button/SendButton';

const ContactPage: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.language);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async () => {
    if (isLoading) return;

    if (!name || !email || !phone || !message) {
      toast.warning('Please fill out all required fields.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
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
        toast.success('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        toast.error(res.data?.message || 'Something went wrong.');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send message.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />

       <div className="grid container items-center mx-auto my-5 md:my-28 px-5 md:px-0 gap-8 md:grid-cols-2">
          {/* Info Cards */}
          <div className="space-y-9 ">
            <div className="rounded-xl bg-linear-to-r from-white to-slate-50 p-6 shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primaryBlue text-white">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{lang === 'bn' ? 'ইমেইল' : 'Email'}</h4>
                  <p className="mt-1 text-gray-600">info@darkak.com.bd</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-linear-to-r from-white to-slate-50 p-6 shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primaryBlue text-white">
                  <FaPhoneAlt className="text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{lang === 'bn' ? 'ফোন' : 'Phone'}</h4>
                  <p className="mt-1 text-gray-600">01711726501</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-linear-to-r from-white to-slate-50 p-6 shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primaryBlue text-white">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{lang === 'bn' ? 'অবস্থান' : 'Location'}</h4>
                  <p className="mt-1 text-gray-600">Upashahar, Bogura -5800</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl bg-linear-to-r from-white to-slate-50 p-6 shadow">
            <div >
              <p className="mb-4 text-lg font-medium text-gray-800">{lang === 'bn' ? 'মেসেজ পাঠান' : 'Send us a message'}</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm text-gray-600">{lang === 'bn' ? 'নাম' : 'Name'}</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none "
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm text-gray-600">{lang === 'bn' ? 'ইমেইল' : 'Email'}</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none "
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm text-gray-600">{lang === 'bn' ? 'ফোন' : 'Phone'}</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none "
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm text-gray-600">{lang === 'bn' ? 'বিষয়' : 'Subject'}</label>
                  <input id="subject" type="text" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none " />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-1 block text-sm text-gray-600">{lang === 'bn' ? 'বার্তা' : 'Message'}</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-32 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none "
                />
              </div>

              <div className="mt-4 flex items-center justify-end">
                <SendButton link={handleSignup} text={isLoading ? (lang === 'bn' ? 'লোড হচ্ছে...' : 'Loading...') : (lang === 'bn' ? 'পাঠান' : 'Send')} />
              </div>
            </div>
          </div>
        </div>

      {/* Map */}
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
