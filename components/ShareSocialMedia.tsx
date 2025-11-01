// components/SocialShare.js
'use client';

import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaPinterestP,
  FaLinkedinIn,
  FaTelegramPlane,
} from 'react-icons/fa';

const SocialShare = ({ url, title }: { url: string; title: string }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  console.log('sm', title, url);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const openShareWindow = (
    platform: 'facebook' | 'twitter' | 'whatsapp' | 'pinterest' | 'linkedin' | 'telegram'
  ) => {
    const link = shareLinks[platform];
    window.open(link, '_blank', 'width=600,height=600');
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => openShareWindow('facebook')}
        aria-label="Share on Facebook"
        className="hover:text-blue-600"
      >
        <FaFacebookF size={24} />
      </button>
      <button
        onClick={() => openShareWindow('twitter')}
        aria-label="Share on Twitter"
        className="hover:text-blue-400"
      >
        <FaTwitter size={24} />
      </button>
      <button
        onClick={() => openShareWindow('whatsapp')}
        aria-label="Share on WhatsApp"
        className="hover:text-green-500"
      >
        <FaWhatsapp size={24} />
      </button>
      <button
        onClick={() => openShareWindow('pinterest')}
        aria-label="Share on Pinterest"
        className="hover:text-red-600"
      >
        <FaPinterestP size={24} />
      </button>
      <button
        onClick={() => openShareWindow('linkedin')}
        aria-label="Share on LinkedIn"
        className="hover:text-blue-700"
      >
        <FaLinkedinIn size={24} />
      </button>
      <button
        onClick={() => openShareWindow('telegram')}
        aria-label="Share on Telegram"
        className="hover:text-blue-400"
      >
        <FaTelegramPlane size={24} />
      </button>
    </div>
  );
};

export default SocialShare;
