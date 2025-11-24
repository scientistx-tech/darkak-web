"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import EmailInput from "./EmailInput";
import { usePasswordResetMailMutation } from "@/redux/services/authApis";
import { toast } from "react-toastify";
import ChangePasswordPage from "./ChangePasswordPage";

const ForgotPasswordPage: React.FC = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter()

  const [sendOtp, { isLoading: sendingOtp }] = usePasswordResetMailMutation();

  useEffect(() => {
    if (isOtpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer <= 0) {
      setResendDisabled(false);
    }
  }, [isOtpSent, timer]);

  const handleSendOtp = async () => {
    if (!email) return toast.info("Please enter your email.");

    try {
      const d = await sendOtp(email).unwrap();
      toast.success("Please check your email/sms!");
      setIsOtpSent(true);
      setTimer(60);
      setResendDisabled(true);
      if (email?.length == 11) {
        router.push(`/auth/forgot-password?id=${d?.user?.id || ""}`)
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  if (id)
    return (
      <div className="flex h-screen items-center justify-center bg-primaryBlue">

        <div
          className="z-10 flex w-[90%] flex-col items-center justify-center rounded-lg bg-white p-6 shadow md:w-[60%]"
        >
          <div className="w-full">
            <ChangePasswordPage></ChangePasswordPage>
          </div>
        </div>


      </div>
    );
  return (
    <div className="flex h-screen items-center justify-center bg-primaryBlue">


      <div
        className="z-10 flex w-[90%] flex-col items-center justify-center rounded-lg bg-white p-6 shadow md:w-[60%]"
      >
        <p className="mb-1 text-2xl font-medium text-secondary">
          Reset Password
        </p>
        <p className="text-[15px]">
          We will send a verification to your e-mail
        </p>

        <EmailInput value={email} onChange={setEmail} />

        <button
          name="sendOtpButton"
          className={`my-4 w-[90%] rounded-lg bg-[#003084] py-2 font-semibold text-white transition hover:bg-[#00153B] md:w-[70%] ${sendingOtp && "opacity-50"
            }`}
          onClick={handleSendOtp}
          disabled={sendingOtp}
        >
          {isOtpSent ? "Resend OTP" : "Send for OTP"}
        </button>

        {isOtpSent && (
          <p className="text-[14px]">
            <button
              name="resendOtpButton"
              className={`font-medium text-secondary ${resendDisabled
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-transparent hover:text-primary"
                }`}
              onClick={handleSendOtp}
              disabled={resendDisabled}
            >
              Resend OTP
            </button>{" "}
            in <span className="text-primary">{timer}s</span>
          </p>
        )}

        <div className="mt-5 flex font-medium">
          <p>Don&apos;t Have an account?</p>
          <Link
            href="/auth/signup"
            className="ml-1 text-primary transition-all hover:text-primaryBlue hover:underline"
          >
            Register Now
          </Link>
        </div>

        <div className="mt-3 flex w-[90%] items-center justify-around md:w-[70%]">
          <div className="h-[1px] w-[45%] bg-yellow-200" />
          <p className="text-[10px]">OR</p>
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
      </div>


    </div>
  );
};

export default ForgotPasswordPage;
