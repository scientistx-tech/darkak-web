"use client";
// components/PrivateLayout.tsx
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

interface PrivateLayoutProps {
  children: ReactNode;
}

const UserPrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLocalStorage("path", pathname);
  }, [pathname]);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    } else {
      router.replace(getLocalStorage("path") || "/user/profile");
    }
  }, [user, router]); // Runs when admin state changes

  if (!user) {
    return null; // Prevent rendering before redirect
  }

  return <div>{children}</div>;
};

export default UserPrivateLayout;
