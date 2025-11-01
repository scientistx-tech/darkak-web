// components/FirebaseNotifications.tsx
"use client";
import { getFCMToken, onMessage } from "@/utils/firebase";
import { getMessaging } from "firebase/messaging";
import { useEffect } from "react";
import { toast } from "react-toastify";

const FirebaseNotifications = () => {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          getFCMToken().then((token) => {
            if (token) {
              // send token to your server if needed
              console.log("Received token:", token);
            }
          });

          onMessage(getMessaging(), (payload) => {
            console.log("Message received. ", payload);
            toast.done(payload?.notification?.title || "New Notification");
          });
        }
      });
    }
  }, []);

  return null;
};

export default FirebaseNotifications;
