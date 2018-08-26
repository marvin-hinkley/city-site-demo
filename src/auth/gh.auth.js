import './facebook.auth.js';
import '../firebase.js';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

module.exports = {
  init: function() {
    $('#google-auth').on('click', (e) => {
      firebase.auth().signInWithPopup(googleAuthProvider).then(function(result) {
        console.log('Google auth result', result);
      }).catch((err) => {
        console.log('Google auth error', err);
      });
    });
  },

  checkFacebookLoginState: function() {
    FB.getLoginStatus((response) => {
      console.log('FB Auth Response', response);
      //statusChangeCallback(response);
    });
  }
};
