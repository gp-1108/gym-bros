// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBta8m84efwiJLhAs6RUE5ScKBJNXtLHrE',
  authDomain: 'my-gym-bot.firebaseapp.com',
  projectId: 'my-gym-bot',
  storageBucket: 'my-gym-bot.appspot.com',
  messagingSenderId: '352715480991',
  appId: '1:352715480991:web:e7d33e649535b8db6467aa',
  measurementId: 'G-MC3T2G39EB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// import {connectAuthEmulator} from 'firebase/auth';
// import {connectFirestoreEmulator} from 'firebase/firestore';
// connectFirestoreEmulator(db, 'localhost', 8080);
// connectAuthEmulator(auth, 'http://localhost:9099');
export default app;

// const analytics = getAnalytics(app);
