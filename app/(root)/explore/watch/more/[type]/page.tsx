import React from 'react';
import { Metadata } from 'next';
import MoreProduct from '../MoreComponent';
export const metadata: Metadata = {
  title: 'Products',
};
export default function page() {
  return (
    <div>
      <MoreProduct />
    </div>
  );
}
