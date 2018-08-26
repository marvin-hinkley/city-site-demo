const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cors = require('cors')({origin: true});

admin.initializeApp();

exports.subscribeFCMTopic = functions.https.onRequest((req, res) => {
  let valid = typeof req.body.token != 'undefined' && typeof req.body.topic != 'undefined';

  if(!valid) {
    console.log('request body', req.body);
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with both a topic and a valid token');
  }

  if(valid) {
    request('https://iid.googleapis.com/iid/v1/' + req.body.token + '/rel/topics/' + req.body.topic, (err, resp, body) => {
      if(err) {
        throw new functions.https.HttpsError('communication failure', err);
      }

      console.log('registered token with topic ' + req.body.topic);
      cors(req, res, () => {
        res.send({result: 'huzzah!'});
      });
    });
  }
});
