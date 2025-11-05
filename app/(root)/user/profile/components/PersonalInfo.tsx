'use client';

import React from 'react';
import ClientLoading from '@/app/(root)/components/ClientLoading';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaHeart,
  FaMapMarkerAlt,
  FaRing,
  FaCalendarCheck,
  FaKey,
} from 'react-icons/fa';
import { User } from '@/types/userTypes';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface PersonalInfoProps {
  data?: User;
  isLoading: boolean;
  isError: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, isLoading, isError }) => {
  const lang = useSelector((state: RootState) => state.language.language);

  // console.log(data);

  if (isLoading) return <ClientLoading />;
  if (isError || !data) return <p className="text-red-500">Failed to load user data.</p>;

  const user = data;

  const fullAddress = user.address
    ? `${user.address.area}, ${user.address.sub_district}, ${user.address.district}, ${user.address.division}`
    : 'Not Provided';

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-[#f0f4ff] to-[#e4ecff] p-10 shadow-xl transition-all hover:shadow-2xl">
      <div className="mb-6 flex items-center justify-between md:mb-12">
        <h2 className="text-3xl font-semibold text-[#1e3a8a]">
          {lang === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <InfoItem icon={<FaUser />} label={lang === 'bn' ? 'নাম' : 'Name'} value={user.name} />
        <InfoItem
          icon={<FaEnvelope />}
          label={lang === 'bn' ? 'ইমেইল' : 'Email'}
          value={user.email}
        />
        <InfoItem
          icon={<FaPhone />}
          label={lang === 'bn' ? 'ফোন' : 'Phone'}
          value={user.phone ?? 'N/A'}
        />
        <InfoItem
          icon={<FaBirthdayCake />}
          label={lang === 'bn' ? 'জন্মতারিখ' : 'Date of Birth'}
          value={user.dob?.split('T')[0] ?? 'N/A'}
        />
        <InfoItem
          icon={<FaHeart />}
          label={lang === 'bn' ? 'লিঙ্গ' : 'Gender'}
          value={user.gender ?? 'N/A'}
        />
        <InfoItem
          icon={<FaRing />}
          label={lang === 'bn' ? 'বৈবাহিক অবস্থা' : 'Marital Status'}
          value={user.marital_status ?? 'N/A'}
        />
        {user.marital_status === 'Married' && (
          <InfoItem
            icon={<FaCalendarCheck />}
            label={lang === 'bn' ? 'বিবাহ বার্ষিকী' : 'Anniversary Date'}
            value={user.anniversary_date?.split('T')[0] ?? 'N/A'}
          />
        )}

        <InfoItem
          icon={<FaMapMarkerAlt />}
          label={lang === 'bn' ? 'ঠিকানা' : 'Address'}
          value={fullAddress}
          fullWidth
        />
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  fullWidth?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, fullWidth }) => {
  return (
    <div className={`flex items-start gap-4 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] text-white">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-lg font-semibold text-[#00153B]">{value}</p>
      </div>
    </div>
  );
};

export default PersonalInfo;
