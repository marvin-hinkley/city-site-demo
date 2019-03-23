import firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: "redacted",
  authDomain: "gold-hill-demo.firebaseapp.com",
  databaseURL: "https://gold-hill-demo.firebaseio.com",
  projectId: "gold-hill-demo",
  storageBucket: "gold-hill-demo.appspot.com",
  messagingSenderId: "redacted"
};
firebase.initializeApp(config);

const database = firebase.firestore();

const auth = firebase.auth();
auth.languageCode = 'en-us';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
facebookAuthProvider.addScope('email');

const currentUser = auth.currentUser;

export {
  database,
  auth,
  googleAuthProvider,
  facebookAuthProvider,
  currentUser
}