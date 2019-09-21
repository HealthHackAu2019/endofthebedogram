'use strict';

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: !!process.env.PUSHER_APP_ENCRIPTED,
});

module.exports.publish = (event, context, callback) => {
  const body = JSON.parse(event.body || {});

  pusher.trigger(body.channel, body.event, body.message);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Done!',
      input: body,
    }),
    headers: {
      'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization, cache-control',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Credentials': true,
    },
  };

  callback(null, response);
};
