"use client";

import { useEffect } from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const FirebaseAuthProvider = () => {
  useFirebaseAuth(); // This sets user in Redux after Firebase login
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      //router.replace("/"); // Redirect after social login
    }
  }, [user, router]);

  return null;
};

export default FirebaseAuthProvider;
