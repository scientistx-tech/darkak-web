import React from "react";

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, onClose, children }) => {
  return (
    <>
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <div
            className="fixed top-0 left-0 z-50 h-full w-4/5 max-w-[350px] bg-white shadow-lg overflow-y-auto"
          >
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default CustomDrawer;
