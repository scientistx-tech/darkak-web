// components/InputField.tsx
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import React from 'react';

type InputFieldProps = {
  id: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  showPasswordToggle = false,
  onTogglePassword,
}) => {
  return (
    <div className="relative mb-4 w-full">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        required
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${value ? "top-[-2px] bg-white px-1 text-sm text-primary" : ""}`}
      >
        {label}
      </label>
      {showPasswordToggle && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={onTogglePassword}
        >
          {type === 'password' ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </button>
      )}
    </div>
  );
};

export default InputField;
