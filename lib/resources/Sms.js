
'use strict';

var API_PATH    = 'sms',
    API_VERSION = '1.5';
    _path       = [API_PATH, API_VERSION].join('/');

module.exports = function() {
  return {
    send : {
      path : [ _path, 'send'].join('/'),
      method : 'POST'
    }, 
    status : {
      path : [ _path, 'status'].join('/'),
      method : 'GET'
    },
    sent : {
      path : [ _path, 'sent'].join('/'),
      method : 'GET'
    },
    balance : {
      path : [ _path, 'balance'].join('/'),
      method : 'GET'
    },
    cancel : {
      path : [ _path, 'cancel'].join('/'),
      method : 'POST'
    }
  }
};
