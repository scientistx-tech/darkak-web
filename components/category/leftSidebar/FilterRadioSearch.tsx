import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Option {
  value: string;
  label: string;
}

interface FilterRadioSearchProps {
  title: string;
  name: string;
  options: Option[];
  selected: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSeeMore?: () => void;
  showSeeMore?: boolean;
}

const FilterRadioSearch: React.FC<FilterRadioSearchProps> = ({
  title,
  name,
  options,
  selected,
  onChange,
  onSeeMore,
  showSeeMore = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState<boolean>(true);

  const handleOpenClose = () => {
    setOpen((pre) => !pre);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={`rounded-md bg-blue-100 px-4 ${open ? "pb-8" : "pb-2"} pt-4 shadow-md`}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
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

      {/* Search Box */}
      {open && (
        <>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3 w-full rounded-full border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {/* Radio Options */}
          <div className="hide-scrollbar max-h-48 space-y-3 overflow-y-auto">
            {filteredOptions.map((option) => (
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
                  className="form-radio size-5 text-blue-500 focus:outline-none focus:ring-0"
                />
                <span className="text-sm text-blue-900">{option.label}</span>
              </label>
            ))}
          </div>

          {/* See More Button */}
          {showSeeMore && (
            <button
              onClick={onSeeMore}
              className="mt-4 w-full rounded-full bg-[#5694FF] py-2 text-sm font-medium text-white transition hover:bg-blue-600"
            >
              See More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FilterRadioSearch;
