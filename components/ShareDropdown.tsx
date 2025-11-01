"use client";

import { useState } from "react";
import ShareModal from "./ShareModal";
import { usePathname } from "next/navigation";

export default function ShareDropdown({
  productName,
}: {
  productName: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const pathname = usePathname();

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}`
      : pathname;

  const handlePlatformClick = (platform: string) => {
    setSelectedPlatform(platform);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        Share
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 rounded border bg-white shadow">
          {["facebook", "twitter", "whatsapp", "pinterest"].map((platform) => (
            <button
              key={platform}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handlePlatformClick(platform)}
            >
              Share on {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>
      )}

      {selectedPlatform && (
        <ShareModal
          url={productUrl}
          title={productName}
          platform={selectedPlatform}
          onClose={() => setSelectedPlatform(null)}
        />
      )}
    </div>
  );
}
