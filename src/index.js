import './index.scss';
import './auth/facebook.auth.js';
import './firebase.js';
const messaging = require('./messaging/firebase.messaging');

(function(gh, $) {
  //Initialization-----------------------------------------------------------//
  gh.auth = {};
  messaging.init();

  //Click handlers-----------------------------------------------------------//
  $('.fcm-subscription').on('click', (e) => {
    let permission = localStorage.getItem('fcmPermission');

    //incorrect 'checked' conditional
    //topic needs to come from element attr
    if(e.checked && permission) {
      messaging.subscribeFCMTopic(e.topic);
    } else {
      messaging.unsubscribeFCMTopic(e.topic);
    }
  });

  //Authentication stuff: Refactor into separate file?-----------------------//
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  $('#google-auth').on('click', (e) => {
    firebase.auth().signInWithPopup(googleAuthProvider).then(function(result) {
      console.log('Google auth result', result);
    }).catch((err) => {
      console.log('Google auth error', err);
    });
  });
  gh.auth.checkFacebookLoginState = function() {
    FB.getLoginStatus((response) => {
      console.log('FB Auth Response', response);
      //statusChangeCallback(response);
    });
  };
})(window.goldHill = window.goldHill || {}, jQuery);
