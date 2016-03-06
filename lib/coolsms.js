
/*jshint camelcase: false*/
/*global escape: true*/
'use strict';

var request = require('request'),
    Resource = require('./resource')
     _ = require('lodash');

exports.init = function (config, cb) {
  if (!config.secret || !config.key) {
    return cb && cb(new Error('secret or key is missing'));
  } 
  var resource = new Resource(config);
  // insert coolsms api resources
  resource
    .inject(require('./resources/Sms'))
    .inject(require('./resources/Mo'))
    .inject(require('./resources/SenderID'));

  // exports api methods
  _.defaults(exports.module, res.extractMethods() );

};
