"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { convertFirebaseToAppUser } from "@/utils/convertFirebaseUser";
import { setUser } from "@/redux/slices/authSlice";
import { auth } from "@/utils/firebase";

export const useFirebaseAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const appUser = convertFirebaseToAppUser(firebaseUser);
        const token = await firebaseUser.getIdToken();
        
        dispatch(setUser({
          user: appUser,
          token: token,
        }));
      }
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return initialized;
};