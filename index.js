/*jshint camelcase: false*/
/*global escape: true*/
'use strict';

var request = require('request'),
    crypto = require('crypto'),
    _ = require('lodash');

var DEFAULT_REQUEST_TIMEOUT = 10 * 1000; // 10 seconds in milliseconds

function genId(len) {
  if (!len) { len = 6; } //default 6: ~68G
  return crypto.randomBytes(Math.ceil(len * 3 / 4))
  .toString('base64')
  .slice(0, len);
}

var API_BASE = 'https://api.coolsms.co.kr/sms/1.5',
    API_SECRET, API_KEY;
var requestTimeout = DEFAULT_REQUEST_TIMEOUT;

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

function getNumberWithZeroPrefix(number) {
  return _.startsWith(number, '0') ? number : '0' + number;
}

exports.init = function (config, cb) {
  if (!config.secret || !config.key) {
    return cb && cb(new Error('secret or key is missing'));
  }
  API_SECRET = config.secret;
  API_KEY = config.key;
  requestTimeout = config.requestTimeout || DEFAULT_REQUEST_TIMEOUT;
};

_.forEach(['status', 'sent', 'balance'], function (cmd) {
  exports[cmd] =  function (cb) {
    request.get({
      url: [API_BASE, cmd].join('/'),
      qs: getAuth(),
      json: true,
      timeout: requestTimeout
    }, function (err, res, body) {
      if (res && res.statusCode >= 300 || res && res.statusCode < 200) {
        return cb && cb(new Error(body && body.code));
      }
      return cb && cb(err, body);
    });
  };
});

exports.send = function (body, cb) {
  if (body.type === 'SMS' && getTextLength(body.text) > 90) {
    return cb && cb(new Error('too long SMS messge'));
  }

  body.to = getNumberWithZeroPrefix(body.to);

  request.post({
    url: API_BASE + '/send',
    json: true,
    form: _.defaults(body, getAuth()),
    timeout: requestTimeout
  }, function (err, res, body) {
    if (res && res.statusCode >= 300 || res && res.statusCode < 200) {
      return cb && cb(new Error(body && body.code));
    }
    return cb && cb(err, body);
  });
};
