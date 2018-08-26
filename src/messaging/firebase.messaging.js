const messaging = firebase.messaging();

module.exports = {
  messageClient: messaging,
  init: function(cb) {
    let thingy = this;
    messaging.usePublicVapidKey('BPoDMZ4BGXqN90zTQUJyBhQpg8Ttu2538fdDCnBP_0shrktn3Tef0tmIO_5qFx0VttOETcQeHxcSMJFqDA0dI90');

    messaging.requestPermission().then(function() {
      console.log('Notification permission granted');
      thingy.getToken(function(){cb()});
    }).catch(function(err) {
      console.log('Failed to obtain notification permission', err);
    });

    messaging.onTokenRefresh(function() {
      this.getToken(function(){});
    });

    messaging.onMessage(function(payload) {
      console.log('Message recieved', payload);
    });

    cb();
  },
  getToken: function(cb) {
    messaging.getToken().then(function(currentToken) {
      if(currentToken) {
        console.log('Current token', currentToken);
        cb(currentToken);
      } else {
        console.log('No token available');
      }
    }).catch(function(err) {
      console.log('Error while retreiving token', err);
    });
  }
}
