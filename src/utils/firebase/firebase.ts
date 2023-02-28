import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { NotificationPayload } from '../../types/Notification';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY;

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getDeviceToken = async (setHasDeviceToken) => {
  try {
    await navigator.serviceWorker.register('./firebase-messaging-sw.js');

    return messaging
      .getToken({ vapidKey: vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          setHasDeviceToken(true);
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
        } else {
          // console.log('No registration token available. Request permission to generate one.');
          setHasDeviceToken(false);
          // shows on the UI that permission is required
        }
        return currentToken;
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
      });
  } catch (err) {
    console.log('Service worker registration failed, error:', err);
  }
};

// app is active in foreground
export const onMessageListener = () =>
  new Promise<NotificationPayload>((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
