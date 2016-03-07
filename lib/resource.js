
'use strict';

var request = require('request'),
    _ = require('lodash'),
    util = require('./util');

function Resource(options) {
  if( !(this instanceof Resource) ) {
    return new Resource(options);
  }
  this.API_KEY    = options.key;
  this.API_SECRET = options.secret;
  this.resources  = {};
}

Resource.prototype.API_BASE = 'https://api.coolsms.co.kr';
Resource.prototype.inject = function(resource) {
  var key;
  var set = resource();
  for(key in set) {
    this.resources[key] = set[key];
  }
  return this;
};
Resource.prototype.extractMethods = function() {
  var _this = this;
  var methods = {};
  var res;
  for(res in _this.resources) {
    methods[res] = (function (res) {
      return function( param, cb ) {
        if(arguments.length === 1 && typeof param ==='function') {
          _this._makeRequest( res, null, param);
        } else {
          _this._makeRequest( res, param, cb);
        }
      };
    })( _this.resources[res] );
  }
  return methods;
};

Resource.prototype._makeRequest = function(resource, param, cb) {
  param = param || {};

  var reqForm    = {};
  var query      = _.defaults(param, util.getAuth(this.API_KEY, this.API_SECRET));
  reqForm.url    = [this.API_BASE, resource.path].join('/');
  reqForm.method = (resource.method || 'GET').toUpperCase();
  reqForm.json   = true;
  if (reqForm.method === 'POST') {
    reqForm.form = query;
  } else {
    reqForm.qs = query;
  }

  request(reqForm)
    .on('response', this._resposeHandler(cb))
    .on('error', this._errorHandler(cb));
};

Resource.prototype._resposeHandler = function(cb) {
  return function(res) {
    if (res.statusCode >= 300 || res.statusCode < 200) {
      cb && cb(new Error(res.statusCode));
    } else {
      res.on('data', function(body) {
        cb && cb(0, body.toString());
      });
    }
  };
};

Resource.prototype._errorHandler = function(cb) {
  return function(err) {
    return cb && cb(new Error(err));
  };
};

module.exports = Resource;
