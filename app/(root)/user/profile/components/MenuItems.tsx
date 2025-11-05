import React from 'react';
import {
  FaUser,
  FaBell,
  FaClipboardList,
  FaShippingFast,
  FaPen,
  FaStar,
  FaMapMarkerAlt,
  FaCommentDots,
} from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// Define the type for allowed tab names
type TabKey =
  | 'personal'
  | 'edit'
  | 'notification'
  | 'order'
  | 'review'
  | 'track'
  | 'return'
  | 'customer';

// Props interface
interface MenuItemsProps {
  activeTab: String;
  setActiveTab: (tab: TabKey) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ setActiveTab, activeTab }) => {
  const lang = useSelector((state: RootState) => state.language.language);

  return (
    <div>
      <div className="mt-6 flex w-full flex-col gap-2">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
            activeTab === 'personal'
              ? 'bg-primaryBlue text-white'
              : 'bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white'
          }`}
        >
          <FaUser />
          {lang === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}
        </button>

        <button
          onClick={() => setActiveTab('edit')}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
            activeTab === 'edit'
              ? 'bg-primaryBlue text-white'
              : 'bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white'
          }`}
        >
          <FaPen />
          {lang === 'bn' ? 'প্রোফাইল সম্পাদনা' : 'Edit Profile'}
        </button>

        <button
          onClick={() => setActiveTab('notification')}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
            activeTab === 'notification'
              ? 'bg-primaryBlue text-white'
              : 'bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white'
          }`}
        >
          <FaBell />
          {lang === 'bn' ? 'নোটিফিকেশন' : 'Notification'}
        </button>

        <button
          onClick={() => setActiveTab('order')}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
            activeTab === 'order'
              ? 'bg-primaryBlue text-white'
              : 'bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white'
          }`}
        >
          <FaClipboardList />
          {lang === 'bn' ? 'অর্ডার হিস্টোরি' : 'Order History'}
        </button>

        <button
          onClick={() => setActiveTab('review')}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
            activeTab === 'review'
              ? 'bg-primaryBlue text-white'
              : 'bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white'
          }`}
        >
          <FaStar />
          {lang === 'bn' ? 'আমার রিভিউ' : 'My Review'}
        </button>

        <button
          onClick={() => setActiveTab('track')}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
            activeTab === 'track'
              ? 'bg-primaryBlue text-white'
              : 'bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white'
          }`}
        >
          <FaMapMarkerAlt />
          {lang === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Order'}
        </button>

        <button
          onClick={() => setActiveTab('return')}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
            activeTab === 'return'
              ? 'bg-primaryBlue text-white'
              : 'bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white'
          }`}
        >
          <FaShippingFast />
          {lang === 'bn' ? 'রিটার্ন এবং রিফান্ড' : 'Return & Refund'}
        </button>

        <button
          onClick={() => setActiveTab('customer')}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
            activeTab === 'customer'
              ? 'bg-primaryBlue text-white'
              : 'bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white'
          }`}
        >
          <FaCommentDots />
          {lang === 'bn' ? 'কাস্টমার কেয়ার' : 'Customer Care'}
        </button>
      </div>
    </div>
  );
};

export default MenuItems;
