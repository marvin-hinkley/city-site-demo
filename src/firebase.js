import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "redacted",
  authDomain: "gold-hill-demo.firebaseapp.com",
  databaseURL: "https://gold-hill-demo.firebaseio.com",
  projectId: "gold-hill-demo",
  storageBucket: "gold-hill-demo.appspot.com",
  messagingSenderId: "redacted"
};
const firebaseApp = firebase.initializeApp(config);

const auth = firebase.auth();
auth.languageCode = 'en-us';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
facebookAuthProvider.addScope('email');

const currentUser = auth.currentUser;
const database = firebase.firestore();
const storage = firebase.storage();

const getPrimaryAuthProvider = function(error) {
  return new Promise((resolve, reject) => {
    auth.fetchSignInMethodsForEmail(error.email)
    .then(providers => {
      resolve(getProvider(providers[0]));
    })
    .catch(err => reject(err));
  });
}

function getProvider(authMethod) {
  switch (authMethod) {
    case 'google.com':
      return googleAuthProvider;
      break;
    case 'password':
      return 'password';
    case 'facebook':
      return facebookAuthProvider;
    default:
      break;
  }
}

export {
  database,
  storage,
  auth,
  googleAuthProvider,
  facebookAuthProvider,
  firebaseApp,
  currentUser,
  getPrimaryAuthProvider
}