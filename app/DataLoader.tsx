"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "@/redux/services/authApis";
import { updateUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";

const FirebaseNotifications = dynamic(() => import("@/components/FirebaseNotifications"), {
  ssr: false,
  loading: () => null,
});

export default function DataLoader({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: any;
}) {
  const { currentData } = useGetUserQuery(undefined, { skip: !!user });
  const dispatch = useDispatch<AppDispatch>();

  const userData = currentData || user;

  useEffect(() => {
    if (userData) dispatch(updateUser(userData));
  }, [userData, dispatch]);

  // ⚡ Defer heavy Firebase + Socket logic
  useEffect(() => {
    if (!userData) return;

    const connectLater = async () => {
      try {
        const [{ getFCMToken }, { socket }] = await Promise.all([
          import("@/utils/firebase"),
          import("@/socket"),
        ]);

        const token = await getFCMToken();
        if (token) {
          socket.connect();
          socket.emit("user_connected", userData.id, token);
        }
      } catch (err) {
        console.error("Socket or Firebase init failed:", err);
      }
    };

    // Wait for idle time or delay slightly
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(connectLater);
    } else {
      setTimeout(connectLater, 2000);
    }
  }, [userData]);

  return (
    <>
      <FirebaseNotifications />
      {children}
    </>
  );
}
