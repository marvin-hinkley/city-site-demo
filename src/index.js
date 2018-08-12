import './index.scss';
import './fb-login.js';

(function(gh) {
  gh.auth = {};

  gh.auth.checkLoginState = function() {
    console.log('checking fb login state');
    FB.getLoginStatus(function(response) {
      console.log('FB Auth Response', response);
      //statusChangeCallback(response);
    });
  };
})(window.goldHill = window.goldHill || {});
