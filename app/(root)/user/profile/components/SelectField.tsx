import React from "react";

interface SelectFieldProps {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        {label}
      </label>
      <select
        className="peer w-full rounded-lg border border-gray-300 px-6 py-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
