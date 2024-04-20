// firebase config key setup 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// app firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDpUzWbfJ4r90nLdvcVDCQIWVtcogtl53U",
    authDomain: "rn-app-33013.firebaseapp.com",
    projectId: "rn-app-33013",
    storageBucket: "rn-app-33013.appspot.com",
    messagingSenderId: "811840223369",
    appId: "1:811840223369:web:95afb0a68485c5635a2e58",
    measurementId: "G-3BELPX4X8H"
  };

//
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export {firebase};
