import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

export interface SortItem {
  value: string;
  name: string;
}

interface SortingDropdownProps {
  sortingItems: SortItem[];
  currentSort: string;
  onSortChange: (name: string, value: string) => void;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const SortingDropdown: React.FC<SortingDropdownProps> = ({
  sortingItems,
  currentSort,
  onSortChange,
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  size = 'md',
  showLabel = true,
  label = "Sort By"
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize selected item based on current sort
  useEffect(() => {
    const sortItem = sortingItems.find(item => item.value === currentSort);
    if (sortItem) {
      setSelectedItem(sortItem.name);
    } else if (sortingItems.length > 0) {
      setSelectedItem(sortingItems[0].name);
    }
  }, [currentSort, sortingItems]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSort = (name: string, value: string) => {
    setSelectedItem(name);
    setIsOpen(false);
    onSortChange(name, value);
  };

  // Size-based styling
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          button: 'px-2 py-1 text-xs',
          dropdown: 'w-32 text-xs',
          label: 'text-xs'
        };
      case 'lg':
        return {
          button: 'px-8 py-3 text-base lg:text-lg',
          dropdown: 'w-48 text-base',
          label: 'text-xl lg:text-3xl'
        };
      default: // md
        return {
          button: 'px-4 py-2 text-sm md:text-base',
          dropdown: 'w-36 md:w-44 text-xs md:text-base',
          label: 'text-sm md:text-xl lg:text-3xl'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className={`flex items-center gap-x-2 md:gap-x-4 lg:gap-x-6 ${className}`}>
      {showLabel && (
        <p className={`whitespace-nowrap font-semibold text-[#003084] ${sizeClasses.label}`}>
          {label}
        </p>
      )}
      
      <div
        className="relative inline-block text-left"
        ref={dropdownRef}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
          className={`
            inline-flex items-center justify-between rounded-full bg-white 
            text-center font-medium text-[#003084] shadow-md ring-1 ring-gray-200 
            transition hover:bg-blue-50 focus:outline-none
            ${sizeClasses.button}
            ${buttonClassName}
          `}
          type="button"
        >
          <span className="truncate">{selectedItem}</span>
          <IoIosArrowDown
            className={`ml-2 text-[#003084] transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <div className={`
            absolute right-0 z-50 mt-2 divide-y divide-gray-100 rounded-lg 
            bg-white shadow-lg ring-1 ring-gray-200
            ${sizeClasses.dropdown}
            ${dropdownClassName}
          `}>
            <ul className="py-2 text-[#003084]">
              {sortingItems.map((item) => (
                <li
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSort(item.name, item.value);
                  }}
                  className={`
                    block cursor-pointer rounded px-4 py-2 transition-colors 
                    hover:bg-blue-50
                    ${selectedItem === item.name ? 'bg-blue-50 font-semibold' : ''}
                  `}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingDropdown;