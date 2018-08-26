import './index.scss';

import * as auth from './auth/gh.auth';
import * as messaging from './messaging/firebase.messaging';

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
