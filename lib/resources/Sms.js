
'use strict';

var API_PATH    = 'sms'
var API_VERSION = '1.5';

exports.module = function(config) {
  return {
    send : {
      path : [ API_PATH, API_VERSION, 'send'].join('/'),
      method : 'POST'
    }, 
    status : {
      path : [ API_PATH, API_VERSION, 'status'].join('/'),
      method : 'GET'
    },
    sent : {
      path : [ API_PATH, API_VERSION, 'sent'].join('/'),
      method : 'GET'
    },
    balance : {
      path : [ API_PATH, API_VERSION, 'balance'].join('/'),
      method : 'GET'
    },
    cancel : {
      path : [API_PATH, API_VERSION, 'cancel'].join('/'),
      method : 'POST'
    }
  }
};
