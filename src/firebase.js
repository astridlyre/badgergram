import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDMlRCDW62z3Mlhp_NdCZ10rGQyniTYqa4",
  authDomain: "furrygram-65a95.firebaseapp.com",
  databaseURL: "https://furrygram-65a95.firebaseio.com",
  projectId: "furrygram-65a95",
  storageBucket: "furrygram-65a95.appspot.com",
  messagingSenderId: "494551921986",
  appId: "1:494551921986:web:621a1936bef6a9ff52c4db",
  measurementId: "G-27EDGY40Q7",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
