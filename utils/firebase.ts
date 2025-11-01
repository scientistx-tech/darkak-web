// lib/firebase.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { isSupported } from 'firebase/messaging'; // Check browser support
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence (optional)
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error('Error setting auth persistence:', error);
  });
}

const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    } else {
      toast.info('Firebase Messaging not supported in this browser.');
    }
  });
}

const getFCMToken = async (): Promise<string | null> => {
  try {
    if (!messaging) return null;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      //console.log('FCM Token:', token);
      return token;
    } else {
      toast.info('Notification permission failed.');
      return null;
    }
  } catch (err) {
    console.error('FCM Token error:', err);
    return null;
  }
};

export { auth, provider, signInWithPopup, getFCMToken, onMessage, fbProvider };
