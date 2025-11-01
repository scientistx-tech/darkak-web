"use client";

import { useEffect } from "react";

type Props = {
  url: string;
  title: string;
  platform: string;
  onClose: () => void;
};

export default function ShareModal({ url, title, platform, onClose }: Props) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [onClose]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareUrls: Record<string, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] max-w-md rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <h2 className="mb-4 text-xl font-semibold">
          Share on {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          You are about to share: <br />{" "}
          <span className="text-blue-600 underline">{url}</span>
        </p>
        <a
          href={shareUrls[platform]}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded bg-blue-600 py-2 text-center text-white hover:bg-blue-700"
        >
          Continue to {platform}
        </a>
      </div>
    </div>
  );
}
