"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUserPassWordChangeMutation } from "@/redux/services/authApis";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const ChangePasswordPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");
  const [code, setCode] = useState("")

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [changePassword, { isLoading }] = useUserPassWordChangeMutation();

  useEffect(() => {
    if (!id || !code) {
      setError("Invalid or missing verification link.");
    }
  }, [id, code]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await changePassword({
        id,
        code,
        password,
      }).unwrap();
      setSuccessMessage("Password changed successfully!");
      setError("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err: any) {
      console.log(err);
      setError(err?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-2xl font-semibold text-secondary">
        Change Password
      </h2>

      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
      {successMessage && (
        <p className="mb-2 text-sm text-green-600">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium">Verification Code</label>
          <input maxLength={6}
            type="text"
            className="mt-1 w-full rounded border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

        </div>
        {/* New Password */}
        <div className="relative">
          <label className="block text-sm font-medium">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="mt-1 w-full rounded border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="mt-1 w-full rounded border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-[#003084] py-2 font-semibold text-white hover:bg-[#00153B] disabled:opacity-60"
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
