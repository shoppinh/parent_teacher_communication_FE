// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCCu4qKxSjEXKeKRC0q7Fe2YtoEy_MgUC4",
    authDomain: "parent-teacher-app-41625.firebaseapp.com",
    projectId: "parent-teacher-app-41625",
    storageBucket: "parent-teacher-app-41625.appspot.com",
    messagingSenderId: "227184639495",
    appId: "1:227184639495:web:ebee4abe57d85f1f6134a2"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
