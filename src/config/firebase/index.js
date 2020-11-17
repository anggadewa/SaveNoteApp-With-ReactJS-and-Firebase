import firebase from "firebase";
// import "firebase/auth";

// var firebaseConfig = {
//   apiKey: "AIzaSyBjkv1LtHeSPDYDRKaBXEZyHs0HWHwN9LA",
//   authDomain: "simple-notes-firebase-49970.firebaseapp.com",
//   databaseURL: "https://simple-notes-firebase-49970.firebaseio.com",
//   projectId: "simple-notes-firebase-49970",
//   storageBucket: "simple-notes-firebase-49970.appspot.com",
//   messagingSenderId: "718753973588",
//   appId: "1:718753973588:web:d7dd2ee1f993d1ad1574c1",
//   measurementId: "G-09HHX78JKN",
// };
// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBjkv1LtHeSPDYDRKaBXEZyHs0HWHwN9LA",
  authDomain: "simple-notes-firebase-49970.firebaseapp.com",
  databaseURL: "https://simple-notes-firebase-49970.firebaseio.com",
  projectId: "simple-notes-firebase-49970",
  storageBucket: "simple-notes-firebase-49970.appspot.com",
  messagingSenderId: "718753973588",
  appId: "1:718753973588:web:d7dd2ee1f993d1ad1574c1",
  measurementId: "G-09HHX78JKN",
});

export const database = firebase.database();
// const firebase = firebase;
export default firebase;
