"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function FirebaseNotifications() {
  useEffect(() => {
    const initFirebase = async () => {
      const { getMessaging, onMessage } = await import("firebase/messaging");
      const { getFCMToken } = await import("@/utils/firebase");

      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted") {
          const token = await getFCMToken();
          if (token) console.log("Received token:", token);

          const messaging = getMessaging();
          onMessage(messaging, (payload) => {
            toast.info(payload?.notification?.title || "New Notification");
          });
        }
      });
    };

    // Defer initialization
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(initFirebase);
    } else {
      setTimeout(initFirebase, 3000);
    }
  }, []);

  return null;
}
