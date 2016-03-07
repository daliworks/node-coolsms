
'use strict';

var API_PATH = 'senderid',
    API_VERSION = '1.1',
    _path = [API_PATH, API_VERSION].join('/');

module.exports = function() {
  return {
    senderRegister : {
      path : [ _path, 'register'].join('/'),
      method : 'POST'
    },
    senderVerify : {
      path : [ _path, 'verify'].join('/'),
      method : 'POST'
    },
    senderDelete : {
      path : [_path, 'delete'].join('/'),
      method : 'POST'
    },
    senderList : {
      path : [_path, 'list'].join('/'),
      method : 'GET'
    },
    senderSetDefault : {
      path : [_path, 'set_default'].join('/'),
      method : 'POST'
    },
    senderGetDefault : {
      path : [_path, 'get_default'].join('/'),
      method : 'GET'
    }
  };
}
