import './index.scss';
import './fb-login.js'

var goldHill = goldHill || {};

(function (gh) {
  gh.checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };
})(goldHill);
