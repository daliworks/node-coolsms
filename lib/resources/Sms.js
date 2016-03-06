
'use strict';

var API_VERSION = '1.5';

var request = require('request'),
    util = require('../util'),
    _ = require('lodash');

exports.module = function(config) {
  return {
    send : function(param) {

    },
    status : function(param) {

    },
    sent : function(param) {

    },
    balance : function(param) {

    },
    cancel : function(param) {

    },
    balance : function(param) {

    } 
  }
};

/*
_.each(['status', 'sent', 'balance'], function (cmd) {
  exports[cmd] =  function (cb) {
    request.get({
      url: [API_BASE, cmd].join('/'),
      qs: getAuth(),
      json: true,
    }, function (err, res, body) {
      if (res.statusCode >= 300 || res.statusCode < 200) {
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
  request.post({
    url : [API_HOST, 'sms', API_VERSION, 'send'].join('/')
    json: true,
    form: _.defaults(body, getAuth()),
  }, function (err, res, body) {
    if (res.statusCode >= 300 || res.statusCode < 200) {
      return cb && cb(new Error(body && body.code));
    }
    return cb && cb(err, body);
  });
};
*/
