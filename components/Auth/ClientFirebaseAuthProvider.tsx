"use client";

import dynamic from "next/dynamic";

const FirebaseAuthProvider = dynamic(() => import("./FirebaseAuthProvider"), {
  ssr: false,
});

export default function ClientFirebaseAuthProvider() {
  return <FirebaseAuthProvider />;
}
