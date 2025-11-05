import React from 'react';

import { cookies } from 'next/headers';
import RequireAccess from '@/components/Layouts/RequireAccess';
import ShopViewPage from '../components/ShopViewPage';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const token = (await cookies()).get('token')?.value;
  const data = await getShopDetailsById(id as string, token || '');
  //console.log(data);
  const seller = data.seller;

  return {
    title: seller?.meta_title || 'Vendor',
    description: seller?.meta_description || '',
    keywords: seller?.meta_keywords?.map((d: any) => d) || [],
    openGraph: {
      title: seller?.meta_title || '',
      description: seller?.meta_description || '',
      images: [
        {
          url: seller?.meta_image, // Update with your image URL
          width: 1200,
          height: 630,
          alt: seller?.meta_alt,
        },
      ],
    },
  };
}

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const token = (await cookies()).get('token')?.value;

  //console.log('id', id);

  const shopDetails = await getShopDetailsById(id, token as string);

  //console.log('shopDetails details', shopDetails);
  return (
    <RequireAccess permission="shop-details">
      <div className="w-full">
        <div className="h-[65px] w-full md:h-[109px]" />
        <ShopViewPage shop={shopDetails?.seller} products={shopDetails?.data} />
      </div>
    </RequireAccess>
  );
}

async function getShopDetailsById(id: string, token: string) {
  //console.log('token', token);
  try {
    const res = await fetch(`https://api.darkak.com.bd/api/public/filter?sellerId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },

      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API error:', res.status, errorText);
      throw new Error('Failed to fetch shop details');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching shop details:', error);
    return null;
  }
}
