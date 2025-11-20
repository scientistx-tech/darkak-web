'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import img1 from '@/Data/Img/app_store_badge.svg';
import img2 from '@/Data/Img/google_play_badge.svg';
import imgBg from '@/Data/Img/Rectangle 136.jpeg';
import paymentBanner from '@/Data/Img/Payment Banner 2 - Copy.png';

import { AppDispatch, RootState } from '@/redux/store';
import { clearUser } from '@/redux/slices/authSlice';
import { auth } from '@/utils/firebase';
import { useGetProductCategoriesQuery } from '@/redux/services/client/categories';
import { useAddSubscriberMutation } from '@/redux/services/client/subscribe';
import { useGetHomeContentQuery } from '@/redux/services/client/homeContentApi';
import { TbLoader2 } from 'react-icons/tb';
import { CgMail } from 'react-icons/cg';
import { BiPhone } from 'react-icons/bi';
import { CiMapPin } from 'react-icons/ci';
import { FaFacebook, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { IconSSLCommerce, PaymentIcon, paymentIconData } from '@/Data/PaymentMethod';
// import { paymentIconData } from '@/Data/paymentImage/PaymentMethod';

function Footer() {
  const lang = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: home } = useGetHomeContentQuery();
  const { data: categories, isLoading, error } = useGetProductCategoriesQuery('');
  const [addSubscriber, { isLoading: subscribeLoading }] = useAddSubscriberMutation();

  const [email, setEmail] = React.useState('');

  const handleSubscribe = async () => {
    if (!email) {
      toast.warning('Please enter your email.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
    } else {
      try {
        await addSubscriber({ email }).unwrap();
        toast.success('Subscribed successfully!');
        setEmail('');
      } catch (error: any) {
        toast.error(error?.data?.message || 'Subscription failed!');
      }
    }
  };

  const handleLogOut = () => {
    dispatch(clearUser());
    auth.signOut();
    toast.info('Logged out successfully');
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="h-[100px] w-full" />
      <div className="relative w-full bg-gradient-to-b from-[#00153B] to-[#003084] md:h-[500px]">
        <Image
          alt=""
          src={imgBg}
          className="hidden h-full w-full object-cover opacity-10 md:absolute md:block"
        />
        <div className="absolute flex w-full flex-col bg-[#003084] md:flex-row md:bg-transparent">
          {/* Left Side */}
          <div className="w-full pl-5 lg:w-2/3 lg:pl-10">
            {/* Subscribe Section */}
            <div className="right-5 mt-[-65px] flex max-w-fit flex-col items-center justify-center rounded-md bg-[#F1F6FF] px-3 py-6 shadow-2xl w-[100%] ">
              <p className="xl:text-xl text-md xl:font-semibold text-[#003084]">
                {lang === 'bn'
                  ? 'নতুন অফার ও আপডেট পেতে সাবস্ক্রাইব করুন'
                  : 'SUBSCRIBE TO OUR NEWSLETTER'}
              </p>
              <div className="mt-5 flex w-full rounded-full bg-white">
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
                  className="w-1/3 rounded-r-full text-sm bg-primary py-2 text-white transition-all duration-500 ease-in-out hover:bg-[#003084] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {subscribeLoading ? (
                    <>
                      <TbLoader2 className="h-4 w-4 animate-spin" />{' '}
                      {lang === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
                    </>
                  ) : (
                    <>{lang === 'bn' ? 'সাবস্ক্রাইব করুন' : 'SUBSCRIBE'}</>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Banner */}
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

                    {[
                      { href: '/', label: lang === 'bn' ? 'হোম' : 'Home' },
                      { href: '/category', label: lang === 'bn' ? 'দোকান' : 'Shop' },
                      { href: '/blogs', label: lang === 'bn' ? 'ব্লগ' : 'Blogs' },
                      { href: '/contact-us', label: lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us' },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Support */}
                  <div className="flex w-1/2 flex-col items-end md:items-start mr-5 md:mr-0">
                    <p className="mb-3 text-xl text-[#BBD4FF] md:mb-5">
                      {lang === 'bn' ? 'সহায়তা' : 'Support'}
                    </p>

                    {[
                      { href: '/about-us', label: lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us' },
                      {
                        href: '/privacy-policy',
                        label: lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy',
                      },
                      {
                        href: '/terms-and-condition',
                        label: lang === 'bn' ? 'শর্তাবলি' : 'Terms and Condition',
                      },
                      {
                        href: '/return-refund-policy',
                        label: lang === 'bn'
                          ? 'রিটার্ন এবং রিফান্ড নীতিমালা'
                          : 'Return and Refund Policy',
                      },
                      { href: '/faq', label: lang === 'bn' ? 'প্রশ্নোত্তর' : 'FAQ' },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="mt-1 text-[#F6F6F6] hover:text-white md:mt-3"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* App Download */}
                <p className="mt-5 hidden text-2xl text-[#BBD4FF] md:block">
                  {lang === 'bn' ? 'আমাদের মোবাইল অ্যাপ ডাউনলোড করুন' : 'Download Our Mobile App'}
                </p>
                <div className="mt-5 hidden justify-start gap-5 md:flex">
                  {[img1, img2].map((img, i) => (
                    <button
                      key={i}
                      className="h-[50px] w-auto opacity-70 transition-all duration-500 ease-in-out hover:opacity-100"
                    >
                      <Image src={img} alt="" className="h-full w-full" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
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
                        href={{ pathname: '/category', query: { categoryId: cat.title } }}
                        className="text-[#F6F6F6] hover:text-white"
                      >
                        {cat.title}
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex w-full flex-col items-start justify-start pl-5 lg:w-1/3 md:items-end md:pl-0">
            <div className="mt-[-40px] hidden w-[100%] rounded-bl-full rounded-tl-full bg-primary px-3 py-5 text-white md:block">
              <p className="text-end md:text-sm  xl:text-md xl:font-medium">
                {lang === 'bn'
                  ? 'শুভ সময় কাটুক, DARKAK এর সাথেই থাকুন কেনাকাটায়'
                  : 'Have a Great Time and keep shopping with DARKAK'}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center md:items-end md:pr-10">
              <p className="mt-5 text-2xl font-medium text-[#BBD4FF] md:mt-16">
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
                <Link
                  href="/auth/signup"
                  className="mt-5 rounded-full border-[2px] border-primary bg-primary px-4 py-1 text-xl font-medium text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-primary md:py-2"
                >
                  {lang === 'bn' ? 'এখনই রেজিস্টার করুন' : 'Register now'}
                </Link>
              )}

              <p className="mt-5 text-xl text-[#BBD4FF] md:mt-8">
                {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
              </p>

              <p className="mt-1 text-[#F6F6F6] opacity-55 hover:text-white hover:opacity-100 md:mt-3 flex items-center gap-2">
                <CgMail size={16} />{' '}
                <a href="mailto:info@darkak.com.bd" className="hover:underline">
                  info@darkak.com.bd
                </a>
              </p>
              <p className="mt-1 text-[#F6F6F6] opacity-55 hover:text-white hover:opacity-100 md:mt-3 flex items-center gap-2">
                <BiPhone size={16} />{' '}
                <a href="tel:01711726501" className="hover:underline">
                  01711726501
                </a>
              </p>
              <p className="mt-1 text-[#F6F6F6] opacity-55 hover:text-white hover:opacity-100 md:mt-3 flex items-center gap-2">
                <CiMapPin size={16} /> Upashahar, Bogura - 5800
              </p>

              <p className="mt-5 text-xl text-[#BBD4FF] md:mt-8">
                {lang === 'bn' ? 'সংযুক্ত থাকুন' : 'Stay Connected'}
              </p>

              <div className="mb-[80px] mt-3 flex gap-4 md:mb-0">
                <a
                  href="https://www.facebook.com/darkakmart"
                  target="_blank"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primaryDarkBlue text-white hover:bg-primary transition-all duration-500"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/darkakmart"
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primaryDarkBlue text-white hover:bg-primary transition-all duration-500"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@DarKakMart"
                  target="_blank"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primaryDarkBlue text-white hover:bg-primary transition-all duration-500"
                >
                  <FaYoutube size={20} />
                </a>
                <a
                  href="https://www.pinterest.com/darkakmart"
                  target="_blank"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primaryDarkBlue text-white hover:bg-primary transition-all duration-500"
                >
                  <FaPinterest size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=8801711726501&text=hello%F0%9F%98%87"
                  target="_blank"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primaryDarkBlue text-white hover:bg-primary transition-all duration-500"
                >
                  <FiMessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Image src={paymentBanner} alt="Payment Methods" className="w-full object-cover" /> */}
      <div className='flex  items-center gap-3 p-10'>

        <div>
          <h3 className='text-xl font-semibold'>Payment Methods</h3>
          <div className='flex items-center flex-wrap  gap-2'>
            {
              paymentIconData.map(({ name, icon: Icon }) => (
                <Icon key={name} alt={name} className="" />
              ))
            }
          </div>
        </div>
        <div className='ml-auto'>

          <h1>Verified by</h1>
          <IconSSLCommerce />
        </div>
      </div >

    </div >
  );
}

export default Footer;
