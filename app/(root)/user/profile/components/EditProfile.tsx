'use client';

import React, { use, useEffect, useState } from 'react';
import SendButton from '@/components/Button/SendButton';
import { useGetUserQuery } from '@/redux/services/authApis';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useUpdateUserAddressMutation, useUpdateUserMutation } from '@/redux/services/userApis';
import ClientLoading from '@/app/(root)/components/ClientLoading';
import { toast } from 'react-toastify';
import InputField from './InputField';
import SelectField from './SelectField';
import { rawDistricts, rawDivisions, rawSubDistricts } from '../../../../../../public/addressData';

export default function EditProfile({ refetch, data }: any) {
  const lang = useSelector((state: RootState) => state.language.language);

  const [updateUserAddress, { isLoading: isUpdatingAddress }] = useUpdateUserAddressMutation();

  const divisions = rawDivisions;
  const districts = rawDistricts;
  const subDistricts = rawSubDistricts;

  const [address, setAddress] = useState({
    area: '',
    division: '',
    divisionId: '',
    district: '',
    districtId: '',
    sub_district: '',
  });
  useEffect(() => {
    if (data.address) {
      const selectedDivision = divisions.find((d) => d.name === data.address.division);
      const selectedDistrict = districts.find((d) => d.name === data.address.district);
      const selectedSubDistrict = subDistricts.find((sd) => sd.name === data.address.sub_district);

      setAddress({
        area: data.address.area,
        division: selectedDivision?.name || '',
        divisionId: selectedDivision?.id || '',
        district: selectedDistrict?.name || '',
        districtId: selectedDistrict?.id || '',
        sub_district: selectedSubDistrict?.name || '',
      });
    }
  }, [data]);
  const { data: user, isLoading, isError } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    anniversary: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        phone: user.phone || '',
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
        gender: user.gender || '',
        maritalStatus: user.marital_status || '',
        anniversary: user.anniversary_date
          ? new Date(user.anniversary_date).toISOString().split('T')[0]
          : '',
      });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (profile.maritalStatus === "married" && !profile.anniversary) {
      return toast.info("Anniversary date is required")
    }
    try {
      await updateUser({
        name: profile.name || undefined,
        phone: profile.phone || undefined,
        dob: profile.dob || undefined,
        gender: profile.gender || undefined,
        marital_status: profile.maritalStatus || undefined,
        anniversary_date:
          profile.maritalStatus === 'single'
            ? undefined
            : profile.maritalStatus === 'divorced'
              ? undefined
              : profile.anniversary,
      }).unwrap();
      refetch();
      toast.success('Profile Updated Successfully!');
    } catch (err: any) {
      console.error('Update Failed:', err);
      toast.error(err?.data?.message);
    }
  };

  //address part

  const handleDivisionChange = (value: string) => {
    const selected = divisions.find((d) => d.name === value);
    setAddress((prev) => ({
      ...prev,
      division: selected?.name || '',
      divisionId: selected?.id || '',
      district: '',
      districtId: '',
      sub_district: '',
    }));
  };

  const handleDistrictChange = (value: string) => {
    const selected = districts.find((d) => d.name === value);
    setAddress((prev) => ({
      ...prev,
      district: selected?.name || '',
      districtId: selected?.id || '',
      sub_district: '',
    }));
  };

  const handleSubDistrictChange = (value: string) => {
    setAddress((prev) => ({
      ...prev,
      sub_district: value,
    }));
  };

  const handleAreaChange = (value: string) => {
    setAddress((prev) => ({ ...prev, area: value }));
  };

  const handleAddressSubmit = async () => {
    const finalAddress = {
      area: address.area,
      division: address.division,
      district: address.district,
      sub_district: address.sub_district,
    };

    try {
      await updateUserAddress(finalAddress).unwrap();
      refetch();
      toast.success('Address updated successfully!');
    } catch (error: any) {
      console.error('Address update failed:', error);
      toast.error(error?.data?.message);
    }
  };

  if (isLoading) return <ClientLoading />;
  if (isError)
    return (
      <p className="text-red-500">
        {lang === 'bn' ? 'প্রোফাইল লোড করতে ব্যর্থ হয়েছে।' : 'Failed to load profile.'}
      </p>
    );

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border bg-gradient-to-tr from-white via-[#ecf3ff] to-white p-10 shadow-2xl">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        {lang === 'bn' ? 'আপনার প্রোফাইল সম্পাদনা করুন' : 'Edit Your Profile'}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          label={lang === 'bn' ? 'নাম' : 'Name'}
          value={profile.name}
          placeholder="Enter Your Name"
          onChange={(value) => handleChange('name', value)}
        />
        <InputField
          label={lang === 'bn' ? 'ফোন' : 'Phone'}
          type="tel"
          value={profile.phone}
          placeholder="Enter Your Phone"
          onChange={(value) => handleChange('phone', value)}
        />
        <InputField
          label={lang === 'bn' ? 'জন্মতারিখ' : 'Date of Birth'}
          type="date"
          value={profile.dob}
          onChange={(value) => handleChange('dob', value)}
        />
        <SelectField
          label={lang === 'bn' ? 'লিঙ্গ' : 'Gender'}
          value={profile.gender}
          onChange={(value) => handleChange('gender', value)}
          options={[
            { label: 'Select Gender', value: '' },
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
        />
        <SelectField
          label={lang === 'bn' ? 'বৈবাহিক অবস্থা' : 'Marital Status'}
          value={profile.maritalStatus}
          onChange={(value) => handleChange('maritalStatus', value)}
          options={[
            { label: 'Select Marital Status', value: '' },
            { label: 'Married', value: 'married' },
            { label: 'Single', value: 'single' },
            { label: 'Divorced', value: 'divorced' },
          ]}
        />
        {profile.maritalStatus === 'married' && (
          <InputField
            label={lang === 'bn' ? 'বিবাহ বার্ষিকী*' : 'Anniversary Date*'}
            type="date"

            value={profile.anniversary}
            onChange={(value) => handleChange('anniversary', value)}
          />
        )}
      </div>
      <div className="mt-5 flex justify-center md:mt-10">
        <SendButton
          link={handleSubmit}
          text={
            isUpdating
              ? lang === 'bn'
                ? 'প্রোফাইল আপডেট হচ্ছে...'
                : 'Updating...'
              : lang === 'bn'
                ? 'প্রোফাইল আপডেট করুন'
                : 'Update Profile'
          }
        />
      </div>
      {/* <hr className="mt-6" /> */}
      <h2 className="my-10 text-center text-2xl font-semibold text-primaryBlue md:text-4xl">
        {lang === 'bn' ? 'ঠিকানা বিবরণ' : 'Address Details'}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectField
          label={lang === 'bn' ? 'বিভাগ' : 'Division'}
          value={address.division}
          onChange={handleDivisionChange}
          options={[
            { label: 'Select Division', value: '' },
            ...divisions.map((d) => ({
              label: d.name,
              value: d.name,
            })),
          ]}
        />

        <SelectField
          label={lang === 'bn' ? 'জেলা' : 'District'}
          value={address.district}
          onChange={handleDistrictChange}
          options={[
            { label: 'Select District', value: '' },
            ...districts
              .filter((d) => d.divisionId === address.divisionId)
              .map((d) => ({
                label: d.name,
                value: d.name,
              })),
          ]}
        />

        <SelectField
          label={lang === 'bn' ? 'উপজেলা' : 'Sub-District'}
          value={address.sub_district}
          onChange={handleSubDistrictChange}
          options={[
            { label: 'Select Sub-District', value: '' },
            ...subDistricts
              .filter((sd) => sd.districtId === address.districtId)
              .map((sd) => ({
                label: sd.name,
                value: sd.name,
              })),
          ]}
        />
      </div>
      <div className="pt-3 md:max-w-[50%] md:pr-3">
        <InputField
          label={lang === 'bn' ? 'এলাকা' : 'Area'}
          value={address.area}
          placeholder="Enter Area"
          onChange={handleAreaChange}
        />
      </div>
      <div className="mt-5 flex justify-center md:mt-10">
        <SendButton
          link={handleAddressSubmit}
          text={
            isUpdatingAddress
              ? lang === 'bn'
                ? 'ঠিকানা আপডেট হচ্ছে...'
                : 'Updating Address...'
              : lang === 'bn'
                ? 'ঠিকানা আপডেট করুন'
                : 'Update Address'
          }
        />
      </div>
    </div>
  );
}
