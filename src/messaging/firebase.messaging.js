const messaging = firebase.messaging();
const functions = firebase.functions();
const subscribeFCMTopic = functions.httpsCallable('subscribeFCMTopic');
const unsubscribeFCMTopic = functions.httpsCallable('unsubscribeFCMTopic');

module.exports = {
  init: function() {
    messaging.usePublicVapidKey('BPoDMZ4BGXqN90zTQUJyBhQpg8Ttu2538fdDCnBP_0shrktn3Tef0tmIO_5qFx0VttOETcQeHxcSMJFqDA0dI90');

    messaging.onTokenRefresh(() => {
      this.getToken(true);
    });

    messaging.onMessage((payload) => {
      console.log('FCM message received', payload);
    });
  },

  requestPermission: function() {
    messaging.requestPermission().then(() => {
      localStorage.setItem('fcmPermission', true);
      this.getToken();
      console.log('Notification permission granted');
    }).catch((err) => {
      localStorage.setItem('fcmPermission', false);
      console.log('Failed to obtain notification permission', err);
    });
  },

  getToken: function(refresh) {
    let token = localStorage.getItem('fcmToken');
    let isRefresh = refresh || false;

    if (!isRefresh && typeof token != 'undefined') {
      return token;
    }

    messaging.getToken().then((currentToken) => {
      if(currentToken) {
        localStorage.setItem('fcmToken', currentToken);
        console.log('Saved token', currentToken);

        return currentToken;
      } else {
        console.log('No token available');
      }
    }).catch((err) => {
      console.log('Error while retreiving token', err);
    });
  },

  subscribeFCMTopic: function(topic) {
    let msgToken = this.getToken();

    subscribeFCMTopic({topic: topic, token: msgToken}).then((result) => {
      console.log('response from subscribe function: ', result);
    }).catch((err) => {
      console.log('error while subscribing: ', err);
    });
  },

  unsubscribeFCMTopic: function(topic) {
    let msgToken = this.getToken();

    unsubscribeFCMTopic({topic: topic, token: msgToken}).then((result) => {
      console.log('response from unsubscribe function: ', result);
    }).catch((err) => {
      console.log('error while unsubscribing: ', err);
    });
  }
}
