import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC60joeDC2I6UBGRuvyTW7SLWVtvt9c9Rw",
  authDomain: "errorchat-130f6.firebaseapp.com",
  projectId: "errorchat-130f6",
  storageBucket: "errorchat-130f6.appspot.com",
  messagingSenderId: "215194662990",
  appId: "1:215194662990:web:0a97d36a5911ed5a636b1f",
};

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const stService = firebase.storage();
