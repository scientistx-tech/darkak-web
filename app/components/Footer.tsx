'use client';
import Link from 'next/link';
import React, { useMemo, useRef } from 'react';
import { notification } from 'antd';

import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaPinterest } from 'react-icons/fa';

import img1 from '@/Data/Img/app_store_badge.svg';
import img2 from '@/Data/Img/google_play_badge.svg';
import imgBg from '@/Data/Img/Rectangle 136.jpeg';
import Image from 'next/image';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/redux/slices/authSlice';
import { auth } from '@/utils/firebase';

import { useGetProductCategoriesQuery } from '@/redux/services/client/categories';
import { useAddSubscriberMutation } from '@/redux/services/client/subscribe';
import { toast } from 'react-toastify';
import { useGetHomeContentQuery } from '@/redux/services/client/homeContentApi';

import paymentBanner from '@/Data/Img/Payment Banner 2 - Copy.png';

function Footer() {
  const lang = useSelector((state: RootState) => state.language.language);

  const { data: home } = useGetHomeContentQuery();
  const [addSubscriber, { isLoading: subscribeLoading }] = useAddSubscriberMutation();
  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = React.useState('');

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  const openNotification = (
    type: 'success' | 'error' | 'warning',
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
      placement: 'topRight',
    });
  };

  const { data: categories, isLoading, error } = useGetProductCategoriesQuery('');

  const handleSubscribe = async () => {
    if (!email) {
      openNotification('warning', 'Email Required', 'Please enter your email.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      openNotification('error', 'Invalid Email', 'Please enter a valid email address.');
    } else {
      try {
        const response = await addSubscriber({ email }).unwrap();
        toast.success('Subscribed successfully!');
        setEmail(''); // Clear the input field after successful subscription
      } catch (error: any) {
        console.log(error);

        toast.error(error?.data?.message || 'Subscription failed!');
      }
    }
  };
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogOut = () => {
    dispatch(clearUser());
    auth.signOut();
  };

  return (
    <div className="w-full">
      {contextHolder}
      <div className="h-[100px] w-full" />
      <div className="relative w-full bg-gradient-to-b from-[#00153B] to-[#003084] md:h-[500px]">
        <Image
          alt=""
          src={imgBg}
          className="hidden h-full w-full object-cover opacity-10 md:absolute md:block"
        />
        <div className="absolute flex w-full flex-col bg-[#003084] md:flex-row md:bg-transparent">
          {/* Left-side */}
          <div className="w-full pl-5 md:w-2/3 md:pl-10">
            <div className="right-5 mt-[-65px] flex w-[97%] flex-col items-center justify-center rounded-md bg-[#F1F6FF] px-3 py-6 shadow-2xl md:w-[50%]">
              <p className="text-xl font-semibold text-[#003084]">
                {lang === 'bn'
                  ? 'নতুন অফার ও আপডেট পেতে সাবস্ক্রাইব করুন'
                  : 'SUBSCRIBE TO OUR NEWSLETTER'}
              </p>
              <div className="mt-5 flex w-[80%] rounded-full bg-white">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-2/3 rounded-l-full border-none py-2 pl-4 outline-none"
                  type="text"
                  placeholder={lang === 'bn' ? 'আপনার ইমেইল লিখুন...' : 'Your email goes here...'}
                  disabled={subscribeLoading}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={subscribeLoading}
                  className="w-1/3 rounded-r-full bg-primary py-2 text-white transition-all duration-500 ease-in-out hover:bg-[#003084] disabled:opacity-60"
                >
                  {subscribeLoading
                    ? lang === 'bn'
                      ? 'লোড হচ্ছে...'
                      : 'Loading...'
                    : lang === 'bn'
                      ? 'সাবস্ক্রাইব করুন'
                      : 'SUBSCRIBE'}
                </button>
              </div>
            </div>

            <div className="flex w-full justify-end md:hidden">
              <div className="mt-[40px] w-[80%] rounded-bl-full rounded-tl-full bg-primary px-3 py-2 text-white md:hidden">
                <p className="text-end font-medium">
                  {lang === 'bn'
                    ? 'শুভ সময় কাটুক, DARKAK এর সাথেই থাকুন'
                    : 'Have a Great Time and keep shopping with DARKAK'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex w-full flex-col md:flex-row">
              <div className="flex w-full flex-col md:w-2/3">
                <div className="flex w-full">
                  {/* Quick Links */}
                  <div className="flex w-1/2 flex-col">
                    <p className="mb-3 text-xl text-[#BBD4FF] md:mb-5">
                      {lang === 'bn' ? 'দ্রুত লিংক' : 'Quick Links'}
                    </p>

                    <Link href="/" className="text-[#F6F6F6] hover:text-white">
                      {lang === 'bn' ? 'হোম' : 'Home'}
                    </Link>
                    <Link href="/category" className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3">
                      {lang === 'bn' ? 'দোকান' : 'Shop'}
                    </Link>
                    <Link href="/category" className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3">
                      {lang === 'bn' ? 'পণ্য' : 'Product'}
                    </Link>
                    <Link href="/blogs" className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3">
                      {lang === 'bn' ? 'ব্লগ' : 'Blogs'}
                    </Link>
                    <Link
                      href="/contact-us"
                      className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3"
                    >
                      {lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
                    </Link>
                  </div>

                  {/* Support */}
                  <div className="flex w-1/2 flex-col items-end md:items-start mr-5 md:mr-0">
                    <p className="mb-3 text-xl text-[#BBD4FF] md:mb-5">
                      {lang === 'bn' ? 'সহায়তা' : 'Support'}
                    </p>

                    <Link href="/about-us" className="text-[#F6F6F6] hover:text-white">
                      {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3"
                    >
                      {lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                    </Link>
                    <Link
                      href="/terms-and-condition"
                      className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3"
                    >
                      {lang === 'bn' ? 'শর্তাবলি' : 'Terms and Condition'}
                    </Link>

                    <Link
                      href="/return-refund-policy"
                      className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3"
                    >
                      {lang === 'bn' ? 'রিটার্ন এবং রিফান্ড নীতিমালা' : 'Return and Refund Policy'}
                    </Link>

                    <Link href="/faq" className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3">
                      {lang === 'bn' ? 'প্রশ্নোত্তর' : 'FAQ'}
                    </Link>
                  </div>
                </div>

                <p className="mt-5 hidden text-2xl text-[#BBD4FF] md:block">
                  {lang === 'bn' ? 'আমাদের মোবাইল অ্যাপ ডাউনলোড করুন' : 'Download Our Mobile App'}
                </p>
                <div className="mt-5 hidden justify-start gap-5 md:flex">
                  <button className="h-[50px] w-auto opacity-70 transition-all duration-500 ease-in-out hover:opacity-100">
                    <Image src={img1} alt="" className="h-full w-full" />
                  </button>

                  <button className="h-[50px] w-auto opacity-70 transition-all duration-500 ease-in-out hover:opacity-100">
                    <Image src={img2} alt="" className="h-full w-full" />
                  </button>
                </div>
              </div>
              <div className="mt-8 flex flex-col md:mt-0 md:w-1/3">
                <p className="mb-3 text-xl text-[#BBD4FF] md:mb-5">
                  {lang === 'bn' ? 'পণ্যের বিভাগসমূহ' : 'Product Categories'}
                </p>

                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="mb-2 h-4 rounded bg-gray-200" />
                  ))
                ) : error ? (
                  <p className="text-sm text-red-500">Failed to load.</p>
                ) : (
                  categories?.map((cat) => (
                    <div key={cat.title} className="mb-1 md:mb-3">
                      <Link
                        href={{
                          pathname: '/category',
                          query: { categoryId: cat.title },
                        }}
                        className="text-[#F6F6F6] hover:text-white"
                      >
                        {cat.title}
                      </Link>
                    </div>
                  ))
                )}
              </div>

              <p className="mt-8 block text-2xl text-[#BBD4FF] md:hidden">
                {lang === 'bn' ? 'আমাদের মোবাইল অ্যাপ ডাউনলোড করুন' : 'Download Our Mobile App'}
              </p>
              <div className="mt-5 flex justify-start gap-5 md:hidden">
                <button className="h-[40px] w-auto">
                  <Image src={img1} alt="" className="h-full w-full" />
                </button>

                <button className="h-[40px] w-auto">
                  <Image src={img2} alt="" className="h-full w-full" />
                </button>
              </div>
            </div>
          </div>

          {/* Right-side */}
          <div className="flex w-full flex-col items-start justify-start pl-5 md:w-1/3 md:items-end md:pl-0">
            <div className="mt-[-40px] hidden w-[100%] rounded-bl-full rounded-tl-full bg-primary px-3 py-5 text-white md:block">
              <p className="text-end text-lg font-medium">
                {lang === 'bn'
                  ? 'শুভ সময় কাটুক, DARKAK এর সাথেই থাকুন কেনাকাটায়'
                  : 'Have a Great Time and keep shopping with DARKAK'}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center md:items-end md:pr-10">
              <p className="mt-5 text-2xl font-medium text-[#BBD4FF] md:mt-16">
                {/* Flat 30% OFF on All Products! */}
                {home?.content?.footer_title}
              </p>

              {user ? (
                <button
                  onClick={handleLogOut}
                  className="mt-5 rounded-full border-[2px] border-primary bg-primary px-4 py-1 text-xl font-medium text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-primary md:py-2"
                >
                  {lang === 'bn' ? 'প্রস্থান করুন' : 'Log Out'}
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/signup"
                    className="mt-5 rounded-full border-[2px] border-primary bg-primary px-4 py-1 text-xl font-medium text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-primary md:py-2"
                  >
                    {lang === 'bn' ? 'এখনই রেজিস্টার করুন' : 'Register now'}
                  </Link>
                </div>
              )}

              <p className="mt-5 text-xl text-[#BBD4FF] md:mt-8">
                {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
              </p>

              <p className="mt-1 text-[#F6F6F6] opacity-55 transition-all duration-500 ease-in-out hover:text-white hover:opacity-100 md:mt-3">
                Email:{' '}
                <a href="mailto:info@darkak.com.bd" className="hover:underline">
                  {' '}
                  info@darkak.com.bd
                </a>
              </p>
              <p className="mt-1 text-[#F6F6F6] opacity-55 transition-all duration-500 ease-in-out hover:text-white hover:opacity-100 md:mt-3">
                Phone:{' '}
                <a href="tel:01711726501" className="hover:underline">
                  01711726501
                </a>
              </p>
              <p className="mt-1 text-[#F6F6F6] opacity-55 transition-all duration-500 ease-in-out hover:text-white hover:opacity-100 md:mt-3">
                Address: Upashahar , Bogura -5800
              </p>

              <p className="mt-5 text-xl text-[#BBD4FF] md:mt-8">
                {lang === 'bn' ? 'সংযুক্ত থাকুন' : 'Stay Connected'}
              </p>

              <div className="mb-[80px] mt-3 flex gap-4 md:mb-0">
                <a
                  href="https://www.facebook.com/darkakmart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primaryDarkBlue text-lg text-white transition-all duration-500 ease-in-out hover:bg-primary"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://www.instagram.com/darkakmart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primaryDarkBlue text-xl text-white transition-all duration-500 ease-in-out hover:bg-primary"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.youtube.com/@DarKakMart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primaryDarkBlue text-xl text-white transition-all duration-500 ease-in-out hover:bg-primary"
                >
                  <FaYoutube />
                </a>

                <a
                  href="https://www.pinterest.com/darkakmart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primaryDarkBlue text-xl text-white transition-all duration-500 ease-in-out hover:bg-primary"
                >
                  <FaPinterest />
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=8801711726501&text=hello%F0%9F%98%87"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primaryDarkBlue text-xl text-white transition-all duration-500 ease-in-out hover:bg-primary"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Image src={paymentBanner} alt="Payment Methods" className="w-full object-cover" />
      </div>
    </div>
  );
}

export default Footer;
