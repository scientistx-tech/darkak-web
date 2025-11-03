"use client";
import React from "react";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative mt-5 w-[90%] md:w-[70%]">
      <input
        type="text"
        id="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        required
      />
      <label
        htmlFor="email"
        className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${
          value ? "top-[-2px] bg-white px-1 text-sm text-primary" : ""
        }`}
      >
        Email or Phone
      </label>
    </div>
  );
};

export default EmailInput;
