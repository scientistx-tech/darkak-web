'use client';

import React from 'react';
import ContentFaqCard from '@/components/shared/ContentFaqCard';
import { useGetHomeContentQuery } from '@/redux/services/client/homeContentApi';

export default function ContentFaqSection() {
  const { data, isLoading, error } = useGetHomeContentQuery();

  if (isLoading) return <p className="text-center py-10">Loading content...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load content.</p>;

  const content = data?.content?.content || ''; 
  const faqs = data?.faqs || [];                

  return (
    <div className="w-full mt-10">
      <ContentFaqCard content={content} faqs={faqs} />
    </div>
  );
}
