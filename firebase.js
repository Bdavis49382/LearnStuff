import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSNubh3hzM0dRRjo6w573IsOF7cGFnZ5U",
  authDomain: "learnstuff-ec9b3.firebaseapp.com",
  projectId: "learnstuff-ec9b3",
  storageBucket: "learnstuff-ec9b3.appspot.com",
  messagingSenderId: "150806638152",
  appId: "1:150806638152:web:4af0d852dbe7a64ea8b27d"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };