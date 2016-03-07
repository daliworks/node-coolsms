
var crypto = require('crypto'),
    _ = require('lodash');

module.exports = {
  
  getAuth : function(api_key, secret_key) {
    var salt = makeRandomeByte(),
        now = Math.floor( _.now()/1000 ),
        sig = crypto.createHmac('md5', secret_key)
                .update(now+salt)
                .digest('hex');
    return {
      api_key : api_key,
      timestamp : now,
      salt : salt,
      signature : sig
    };
  },

  getTextLength : function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      if (escape(str.charAt(i)).length === 6) {
        len++;
      }
      len++;
    }
    return len;
  }

};

function makeRandomeByte(len) {
  len = len || 6; //default 6: ~68G
  var randomBytes = crypto.randomBytes(Math.ceil(len * 3 / 4))
                  .toString('base64')
                  .slice(0, len);
  return randomBytes;
}
