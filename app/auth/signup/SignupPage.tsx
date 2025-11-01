'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SVG from '@/Data/Img/LoginPage.svg';
import SocialButton from './components/SocialButton';
import InputField from './components/InputField';
import Link from 'next/link';
import {
  useEmailRegistrationMutation,
  usePhoneRegistrationMutation,
} from '@/redux/services/authApis';
import OtpModal from './components/OtpModal';

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [signUpMedium, setSignUpMedium] = useState<string>('email');

  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [emailRegistration, { isLoading }] = useEmailRegistrationMutation();
  const [phoneRegistration, { isLoading: isPhoneLoading }] = usePhoneRegistrationMutation();

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

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async () => {
    if (signUpMedium === 'email') {
      if (!validateEmail(email)) {
        openNotification('warning', 'Invalid Email', 'Please enter a valid email address.');
        return;
      }
    }

    if (password !== confirmPassword) {
      openNotification('error', 'Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }

    try {
      if (signUpMedium === 'phone') {
        await phoneRegistration({ name, phone, password }).unwrap();
        openNotification('success', 'Signup Initiated', 'Check your phone for the OTP.');
      } else {
        await emailRegistration({ name, email, password }).unwrap();
        openNotification('success', 'Signup Initiated', 'Check your email for the OTP.');
      }
      setOtpModalVisible(true);
    } catch (error: any) {
      openNotification('error', 'Signup Failed', error?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primaryBlue">
      {contextHolder}
      {/* <Image
        alt="img"
        src={SVG}
        className="absolute -top-7 left-[12.5%] hidden h-[200px] w-[200px] opacity-45 md:block"
      /> */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="z-10 flex w-full max-w-md flex-col items-center justify-center rounded-2xl bg-white px-8 py-10 shadow-lg"
      >
        <p className="mb-1 text-2xl font-medium text-secondary">
          Sign Up to &quot;<span className="text-primary">Darkak</span>{' '}
          <span className="text-primaryBlue">Mart&quot;</span>
        </p>

        <p className="text-[15px]">Sign Up using social network</p>

        <div className="w-full">
          <SocialButton setSignUpMedium={setSignUpMedium} signUpMedium={signUpMedium} />

          <div className="mb-4 flex items-center justify-between">
            <div className="h-[1px] w-[45%] bg-gray-200" />
            <p className="text-xs text-gray-400">OR</p>
            <div className="h-[1px] w-[45%] bg-gray-200" />
          </div>
        </div>
        <InputField
          id="name"
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {signUpMedium === 'email' && (
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {signUpMedium === 'phone' && (
          <InputField
            id="phone"
            label="Phone Number"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        )}
        <InputField
          id="password"
          label="Enter Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle={true}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showPasswordToggle={true}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        <button
          onClick={handleSignup}
          className="w-[90%] rounded-lg bg-primaryBlue py-2 font-semibold text-white transition hover:bg-primary md:w-[70%]"
        >
          {isLoading ? 'Signing Up...' : ' Sign Up'}
        </button>

        <div className="mt-5 flex font-medium">
          <p>Already Have an account?</p>
          <Link
            href="/auth/login"
            className="ml-1 text-primary transition-all hover:text-primaryBlue hover:underline"
          >
            Log In
          </Link>
        </div>

        <div className="mt-3 flex w-[90%] items-center justify-around md:w-[70%]">
          <div className="h-[1px] w-[45%] bg-yellow-200" /> <p className="text-[10px]">OR</p>{' '}
          <div className="h-[1px] w-[45%] bg-yellow-200" />
        </div>

        <div className="mt-3 flex font-medium">
          <Link
            href="/"
            className="text-primary transition-all hover:text-primaryBlue hover:underline"
          >
            Continue as a Guest
          </Link>
        </div>
      </motion.div>

      {/* <Image
        alt="img"
        src={SVG}
        className="absolute -bottom-7 right-[12.5%] hidden h-[200px] w-[200px] opacity-45 md:block"
      /> */}
      <OtpModal
        signUpMedium={signUpMedium}
        onResendOtp={handleSignup}
        email={email}
        phone={phone}
        isVisible={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
      />
    </div>
  );
};

export default SignupPage;
