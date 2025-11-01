import React from 'react';
import CategoryPageServer from '../category/CategoryPageServer';

export default function page() {
  return (
    <div>
      <div className="h-[65px] w-full md:h-[109px]" />
      <CategoryPageServer searchPage={true} />
    </div>
  );
}
