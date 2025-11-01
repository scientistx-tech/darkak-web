// otpModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useVerifyEmailOTPMutation, useVerifyPhoneOTPMutation } from '@/redux/services/authApis';
import { toast } from 'react-toastify';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/authSlice';
import OTPInputs from '../../forgot-password/OTPInputs';

type Props = {
  signUpMedium: string;
  isVisible: boolean;
  email: string;
  phone?: string;
  onClose: () => void;
  onResendOtp?: () => void;
};

const OtpModal: React.FC<Props> = ({
  signUpMedium,
  isVisible,
  onClose,
  email,
  phone,
  onResendOtp,
}) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyEmailOTPMutation();
  const [verifyPhoneOtp, { isLoading: isPhoneLoading }] = useVerifyPhoneOTPMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const handleOtpPaste = (startIndex: number, pasteText: string) => {
    const digits = pasteText
      .replace(/\D/g, '')
      .slice(0, otp.length - startIndex)
      .split('');
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[startIndex + i] = digit;
    });

    setOtp(newOtp);
  };
  const handleSubmit = async () => {
    console.log('Otp', otp);
    setError('');
    const otpString = otp.join('').trim();

    if (otpString.length !== 6) {
      setError('Please enter a 6-digit OTP.');
      return;
    }

    try {
      if (signUpMedium === 'phone') {
        if (!phone) {
          setError('Phone number is missing.');
          return;
        }
        const res = await verifyPhoneOtp({ phone, otp: otpString }).unwrap();
        dispatch(setUser(res));
        if (res.token) {
          toast.success('Registration Successful');
          router.push('/');
        }
      } else {
        const res = await verifyOtp({ email, otp: otpString }).unwrap();
        dispatch(setUser(res));
        if (res.token) {
          toast.success('Registration Successful');
          router.push('/');
        }
      }
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to verify OTP.');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleResendOtp = () => {
    if (onResendOtp) onResendOtp();
    setTimer(60); // restart timer
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
          Verify {signUpMedium === 'email' ? 'Email' : 'Phone'}
        </h2>
        <p className="mb-2 text-center text-sm text-gray-500">
          OTP has been sent to{' '}
          <span className="font-medium">{signUpMedium === 'email' ? 'Email' : 'Phone'}</span>
        </p>

        <div className="flex justify-center">
          <OTPInputs otp={otp} onChange={handleOtpChange} onPasteOtp={handleOtpPaste} />
        </div>

        {error && <p className="mb-3 text-center text-sm text-red-500">{error}</p>}

        <div className="mb-4 flex justify-between">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Submit OTP'}
          </button>
        </div>

        <div className="mt-3 text-center">
          {timer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in <span className="font-semibold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OtpModal;
