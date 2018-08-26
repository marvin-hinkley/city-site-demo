const messaging = firebase.messaging();
const functions = firebase.functions();

function init() {
  messaging.usePublicVapidKey('BPoDMZ4BGXqN90zTQUJyBhQpg8Ttu2538fdDCnBP_0shrktn3Tef0tmIO_5qFx0VttOETcQeHxcSMJFqDA0dI90');

  messaging.onTokenRefresh(() => {
    getToken(true);
  });

  messaging.onMessage((payload) => {
    console.log('FCM message received', payload);
  });
}

function requestPermission() {
  messaging.requestPermission().then(() => {
    localStorage.setItem('fcmPermission', true);
    getToken();
    console.log('Notification permission granted');
  }).catch((err) => {
    localStorage.setItem('fcmPermission', false);
    console.log('Failed to obtain notification permission', err);
  });
}

function getToken(refresh) {
  let token = localStorage.getItem('fcmToken');
  let isRefresh = refresh || false;

  if (!isRefresh && token != null) {
    console.log('Found token locally', token);
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
}

function subscribeFCMTopic(topic) {
  let msgToken = this.getToken();
  let subscribeToTopic = functions.httpsCallable('subscribeFCMTopic');

  subscribeToTopic({topic: topic, token: msgToken}).then((result) => {
    console.log('response from subscribe function: ', result);
  }).catch((err) => {
    console.log('error while subscribing: ', err);
  });
}

function unsubscribeFCMTopic(topic) {
  let msgToken = this.getToken();
  let unsubscribeFromTopic = functions.httpsCallable('unsubscribeFCMTopic');

  unsubscribeFromTopic({topic: topic, token: msgToken}).then((result) => {
    console.log('response from unsubscribe function: ', result);
  }).catch((err) => {
    console.log('error while unsubscribing: ', err);
  });
}

export {init, requestPermission, getToken, subscribeFCMTopic, unsubscribeFCMTopic}
