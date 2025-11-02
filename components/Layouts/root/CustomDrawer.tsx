import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            className="fixed top-0 left-0 z-50 h-full w-4/5 max-w-[350px] bg-white shadow-lg overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomDrawer;
