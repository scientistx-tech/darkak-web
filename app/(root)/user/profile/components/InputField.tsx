import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  type = "text",
  placeholder = "",
  onChange,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        className="peer mt-2 w-full rounded-lg border border-gray-300 px-6 py-3"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
