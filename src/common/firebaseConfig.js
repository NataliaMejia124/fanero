import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDUylVRFlsYswOxrn5_bt5gpTnG2WouD8M",
    authDomain: "fanerotest.firebaseapp.com",
    databaseURL: "https://fanerotest.firebaseio.com",
    projectId: "fanerotest",
    storageBucket: "fanerotest.appspot.com",
    messagingSenderId: "569573915164",
    appId: "1:569573915164:web:fc669f92af2180db61bdd9",
    measurementId: "G-5GC44QH2VJ"
  };

const firebaseApp = firebase.initializeApp(config);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { firebaseApp, googleAuthProvider, facebookAuthProvider}