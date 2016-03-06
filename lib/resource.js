
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
  this.auth       = util.getAuth(this.API_KEY, this.API_SECRET);
}

Resource.prototype.API_BASE = 'https://api.coolsms.co.kr';
Resource.prototype.inject = function(resource) {
  var key;
  for(key in resource) {
    this.resources[key] = resource[key];
  }
  return this;
};
Resource.prototype.extractMethods = function() {
  var methods = {};
  var res;
  for(res in this.resources) {
    methods[res] = function (param, cb) {
      this._makeRequest( this.resources[res], param, cb);
    };
  }
  return methods;
};

Resource.prototype._makeRequest = function(resource, param, cb) {
  var reqForm    = {};
  reqForm.url    = [this.API_BASE, resource.path].join('/');
  reqForm.method = (resource.method || 'GET').toUpperCase();
  reqForm.json   = true;

  if (reqForm.method === 'POST') {
    reqForm.form = _.defaults(param, this.auth);
  } else {
    reqForm.qs = _.defaults(param, this.auth)
  }

  request(reqForm)
    .on('response', this._resposeHandler(cb);
    .on('error', this._errorHandler(cb));
};

Resource.prototype._resposeHandler = function(cb) {
  return function(res, body) {
    if (res.statusCode >= 300 || res.statusCode < 200) {
      cb && cb(new Error(body && body.code));
    } else {
      cb && cb(0, body);
    }
  }
};

Resource.prototype._errorHandler = function(cb) {
  return function(err) {
    return cb && cb(new Error(err));
  }
};
