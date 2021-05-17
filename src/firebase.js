import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDVvmZC-po45_HIMUUwN7zG5jE1WWS-3Ns",
    authDomain: "whatsapp-clone-139a8.firebaseapp.com",
    projectId: "whatsapp-clone-139a8",
    storageBucket: "whatsapp-clone-139a8.appspot.com",
    messagingSenderId: "279330411110",
    appId: "1:279330411110:web:f0c0b47c7a188a601313a7",
    measurementId: "G-B27794X66M"
  };
 
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;