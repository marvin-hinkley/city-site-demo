import './facebook.auth.js';
import '../firebase.js';

function init() {
  $('#google-auth').on('click', (e) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(googleAuthProvider).then(function(result) {
      console.log('Google auth result', result);
    }).catch((err) => {
      console.log('Google auth error', err);
    });
  });
}

function checkFacebookLoginState() {
  FB.getLoginStatus((response) => {
    console.log('FB Auth Response', response);
    //statusChangeCallback(response);
  });
}


export {init, checkFacebookLoginState};
