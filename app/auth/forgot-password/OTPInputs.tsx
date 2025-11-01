// OTPInput.tsx
"use client";
import React, { useRef } from "react";

interface OTPInputsProps {
  otp: string[];
  onChange: (index: number, value: string) => void;
  onPasteOtp: (startIndex: number, pasteValue: string) => void;
}

const OTPInputs: React.FC<OTPInputsProps> = ({ otp, onChange, onPasteOtp }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    onChange(index, value);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    onPasteOtp(index, pasted); // ✅ Call bulk paste handler from parent
  };

  return (
    <div className="relative right-8 mb-4 mt-2 flex w-[90%] justify-evenly gap-3 md:w-[70%]">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={digit}
          // onChange={(e) => onChange(index, e.target.value)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          className="peer block w-[50px] rounded border border-gray-300 bg-white p-2 text-center leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
      ))}
    </div>
  );
};

export default OTPInputs;
