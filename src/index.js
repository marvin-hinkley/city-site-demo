import './index.scss';
import './auth/facebook.auth.js';
import './firebase.js';
const messaging = require('./messaging/firebase.messaging');

(function(gh, $) {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  gh.auth = {};
  messaging.init();

  $('#google-auth').on('click', function(e) {
    firebase.auth().signInWithPopup(googleAuthProvider).then(function(result) {
      console.log('Google auth result', result);
    }).catch(function(error) {
      console.log('Google auth error', error);
    });
  });
  gh.auth.checkFacebookLoginState = function() {
    FB.getLoginStatus(function(response) {
      console.log('FB Auth Response', response);
      //statusChangeCallback(response);
    });
  };
})(window.goldHill = window.goldHill || {}, jQuery);
