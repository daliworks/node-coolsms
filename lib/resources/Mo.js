
'use strict';

var API_PATH = 'mo',
    API_VERSION = '1',
    _path = [API_PATH, API_VERSION].join('/');

module.exports = function() {
  return {
    moList : {
      path : [ _path, 'list'].join('/'),
      method : 'GET'
    },
    moInsert : {
      path : [ _path, 'insert'].join('/'),
      method : 'POST'
    }
  };
}
