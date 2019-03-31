import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA-40BwgXZseWSInCSNjSq3vGBDo_pKkj8",
  authDomain: "projectsstore-d2d56.firebaseapp.com",
  databaseURL: "https://projectsstore-d2d56.firebaseio.com",
  projectId: "projectsstore-d2d56",
  storageBucket: "projectsstore-d2d56.appspot.com",
  messagingSenderId: "1088391368363"
};
firebase.initializeApp(config);
firebase.firestore();
export default firebase;
