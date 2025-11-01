"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

interface PrivateLayoutProps {
  children: ReactNode;
}

const AdminPrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLocalStorage("path", pathname);

    // If user not logged in yet
    if (!user) return;

    // If user is either admin or moderator, allow access
    if (user?.isAdmin || user?.isModerator) {
      setChecked(true); // allow rendering children
    } else {
      router.replace("/auth/login");
    }
  }, [user, router, pathname]);

  // Prevent premature rendering
  if (!checked) return null;

  return <>{children}</>;
};

export default AdminPrivateLayout;
