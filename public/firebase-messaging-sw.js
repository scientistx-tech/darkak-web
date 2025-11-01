// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCfxybrYrwOg6gkR_6kG3qcM-DAcXIIfjQ',
  authDomain: 'darkak-102.firebaseapp.com',
  projectId: 'darkak-102',
  storageBucket: 'darkak-102.firebasestorage.app',
  messagingSenderId: '446987554539',
  appId: '1:446987554539:web:92f1e81784a273230078ae',
  measurementId: 'G-83S4QRL5GG',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message: ', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/favicon.ico',
  });
});