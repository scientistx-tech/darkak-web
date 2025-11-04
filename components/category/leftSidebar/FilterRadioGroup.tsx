"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Option {
  value: string;
  label: string;
}

interface FilterRadioGroupProps {
  title: string;
  name: string;
  options: Option[];
  selected: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterRadioGroup: React.FC<FilterRadioGroupProps> = ({
  title,
  name,
  options,
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleOpenClose = () => {
    setOpen((pre) => !pre);
  };
  return (
    <div className={`rounded-md bg-blue-100 px-4 ${open ? 'pb-8' : 'pb-2'} pt-4 shadow-md`}>
      <div className={`mb-3 flex items-center justify-between`}>
        <h2 className="text-lg font-semibold text-blue-900">{title}</h2>
        <button
          onClick={handleOpenClose}
          className="flex size-[30px] items-center justify-center rounded-full bg-[#003084]"
        >
          <IoIosArrowDown
            size={20}
            color="white"
            className={`${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="space-y-3">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center space-x-4"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected === option.value}
                onChange={onChange}
                className="form-radio text-blue-500 size-5 focus:outline-none focus:ring-0"
              />
              <span className="text-sm text-blue-900">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterRadioGroup;
