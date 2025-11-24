'use client';

import { useEffect, useRef, useState } from 'react';
import { useGetHomeContentQuery } from '@/redux/services/client/homeContentApi';

export default function HeadLineText() {
  const { data: home } = useGetHomeContentQuery();
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const texts = [
    'ANNOUNCEMENT:',
    `🎉 ${home?.content?.header_first_title ?? ''} 🎉`,
    `✨ ${home?.content?.header_second_title ?? ''} ✨`,
    '24/7 Customer Support Available',
    `All rights reserved © ${new Date().getFullYear()} Darkak`,
    'Thank You for Shopping at Darkak.',
  ];

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden border-b border-t border-primaryWhite bg-primaryBlue text-primaryWhite">
      <div className="container mx-auto flex items-center space-x-4 px-4 py-2">
        <div className="relative flex-1 overflow-hidden" ref={containerRef}>
          <div
            className="flex space-x-10 whitespace-nowrap"
          >
            {texts.map((text, index) => (
              <span key={index} className="text-sm font-medium">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
