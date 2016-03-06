
/*jshint camelcase: false*/
/*global escape: true*/
'use strict';

var request = require('request'),
    util = require('./util')
     _ = require('lodash');

var _config = { 
   API_HOST : 'https://api.coolsms.co.kr',
   API_SECRET : null,
   API_KEY : null
};

exports.init = function (config, cb) {
  if (!config.secret || !config.key) {
    return cb && cb(new Error('secret or key is missing'));
  }
  _config.API_SECRET = config.secret;
  _config.API_KEY = config.key;

  _.assign(exports.module, require('./resources/Sms')(_config) );
  _.assign(exports.module, require('./resources/Mo')(_config) );
  _.assign(exports.module, require('./resources/SenderID')(_config) );

};
