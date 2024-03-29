// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getMessaging } from 'firebase/messaging/sw';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: 'AIzaSyBjjWcfY3cJCbsT2Wz4X9ssR3Q2TwJFNtM',
//     authDomain: 'app-receitas-eeb07.firebaseapp.com',
//     projectId: 'app-receitas-eeb07',
//     storageBucket: 'app-receitas-eeb07.appspot.com',
//     messagingSenderId: '218372002302',
//     appId: '1:218372002302:web:d90cdca554af13cc84b0af',
//     measurementId: 'G-8S6ECJJ18E',
// }
// const firebaseConfig = {
//   apiKey: "AIzaSyDfBNYAWvhKlpz9WxABBqW_z2ch8jZsEnU",
//   authDomain: "receitas-93bb5.firebaseapp.com",
//   projectId: "receitas-93bb5",
//   storageBucket: "receitas-93bb5.appspot.com",
//   messagingSenderId: "869306952623",
//   appId: "1:869306952623:web:14eb49598d534d3c0add5a",
//   measurementId: "G-HSHNXEK645"
// };
const firebaseConfig = {
  messagingSenderId: '821625533576',
  apiKey: "AIzaSyDm3Zl3eFWzhYwcZR4WQfn22fMX4fMYaYU",
  authDomain: "appreceitas-3daf2.firebaseapp.com",
  projectId: "appreceitas-3daf2",
  storageBucket: "appreceitas-3daf2.appspot.com",
  messagingSenderId: "821625533576",
  appId: "1:821625533576:web:f807658e7d61b45fa11b3d",
  measurementId: "G-FEGL9G9FXQ",
  serviceWorkerRegistration: {
    updateUnregistration: true,
    url: '/firebase-messaging-sw.js',
  },
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

export { db, messaging, analytics };