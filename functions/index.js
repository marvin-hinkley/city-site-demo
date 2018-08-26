const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cors = require('cors')({origin: true});

admin.initializeApp();

exports.subscribeFCMTopic = functions.https.onCall((data, context) => {
  // console.log('data', data);
  // console.log('method', context.rawRequest.method);
  if(typeof data.token == 'undefined' || typeof data.topic == 'undefined') {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with both a topic and a valid token');
  }

  request('https://iid.googleapis.com/iid/v1/' + data.token + '/rel/topics/' + data.topic, (err, resp, body) => {
    if(err) {
      throw new functions.https.HttpsError('communication failure', err);
    }

    console.log('registered token with topic ' + data.topic);
    return{result: 'huzzah!'}
    // cors(data, context, () => {
    //   return{result: 'huzzah!'};
    // });
  });
});
