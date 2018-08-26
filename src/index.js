import './index.scss';

const auth = require('./auth/gh.auth');
const messaging = require('./messaging/firebase.messaging');

(function(gh, $) {
  //Initialization-----------------------------------------------------------//
  messaging.init();
  auth.init();
  gh.auth = auth;

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
})(window.goldHill = window.goldHill || {}, jQuery);
