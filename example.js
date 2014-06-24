'use strict';

var coolsms = require('./');

coolsms.init({
  secret: 'your_secret_key',
  key: 'your_api_key',
});

coolsms.balance(function (err, result) {
  console.log('result err=%s, result', err, result);
});

coolsms.send({
  to: '01000000000', 
  from: '0200000000', // your number
  type: 'SMS',
  text: '테스트  test .. abcdeef .....efer 테스트 입니다',
}, function (err, result) {
  console.log('result err=%s, result', err, result);
});

coolsms.sent(function (err, result) {
  console.log('result err=%s, result', err, result);
});

coolsms.status(function (err, result) {
  console.log('result err=%s, result', err, result);
});
