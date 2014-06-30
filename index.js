/*jshint camelcase: false*/
/*global escape: true*/
'use strict';

var request = require('request'),
crypto = require('crypto'),
_ = require('lodash');

function genId(len) {
  if (!len) { len = 6; } //default 6: ~68G
  return crypto.randomBytes(Math.ceil(len * 3 / 4))
  .toString('base64')
  .slice(0, len);
}

var API_BASE = 'https://api.coolsms.co.kr/1',
API_SECRET, API_KEY;

function getAuth() {
  var salt = genId(),
  now = Math.floor(_.now()/1000),
  sig = crypto.createHmac('md5', API_SECRET).update(now + salt).digest('hex');

  return {
    api_key: API_KEY,
    timestamp: now,
    salt: salt,
    signature: sig,
  };
}

function getTextLength(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    if (escape(str.charAt(i)).length === 6) {
      len++;
    }
    len++;
  }
  return len;
}

exports.init = function (config, cb) {
  if (!config.secret || !config.key) {
    return cb && cb(new Error('secret or key is missing'));
  }
  API_SECRET = config.secret;
  API_KEY = config.key;
};

_.each(['status', 'sent', 'balance'], function (cmd) {
  exports[cmd] =  function (cb) {
    request.get({
      url: [API_BASE, cmd].join('/'),
      qs: getAuth(),
    }, function (err, res, body) {
      var jsonBody = body;
      try { jsonBody = body && JSON.parse(body); } catch (e) { }
      return cb && cb(err, jsonBody);
    });
  };
});

exports.send = function (body, cb) {
  if (body.type === 'SMS' && getTextLength(body.text) > 90) {
    return cb && cb(new Error('too long SMS messge'));
  }
  request.post({
    url: API_BASE + '/send',
    form: _.defaults(body, getAuth()),
  }, function (err, res, body) {
    var jsonBody = body;
    try { jsonBody = body && JSON.parse(body); } catch (e) { }
    return cb && cb(err, jsonBody);
  });
};
