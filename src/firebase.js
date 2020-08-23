import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDBl920MLblztXl7ia2CXmzDw9GAhlT2Gc",
  authDomain: "twitter-7fc50.firebaseapp.com",
  databaseURL: "https://twitter-7fc50.firebaseio.com",
  projectId: "twitter-7fc50",
  storageBucket: "twitter-7fc50.appspot.com",
  messagingSenderId: "957212946652",
  appId: "1:957212946652:web:e567db0f49de816a70c419",
  measurementId: "G-CHPKEHHLCP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
