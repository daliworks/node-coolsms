node-coolsms
=====

www.coolsms.co.kr REST API helper for node.js

## Installation
`npm install node-coolsms`

## Documentaion
Documentaion is available at http://www.coolsms.co.kr/REST_API

## Usage
```javascript
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
```

## Available resources & methods
*Where you see `params` it is a plain JavaScript object, e.g. `{ text: 'Hello world!' }`*
*`param` is not need to include authentication information*

 * sms
  * [`send(params, [callback])`](http://www.coolsms.co.kr/SMS_API#POSTsend)
  * [`status([params, callback])`](http://www.coolsms.co.kr/SMS_API#GETstatus)
  * [`sent([params, callback])`](http://www.coolsms.co.kr/SMS_API#GETsent)
  * [`balance([callback])`](http://www.coolsms.co.kr/SMS_API#GETbalance)
  * [`cancel([params, callback])`](http://www.coolsms.co.kr/SMS_API#POSTcancel)
 * mo
  * [`moList([params, callback])`](http://www.coolsms.co.kr/MO_API#GETlist)
  * [`moInsert(params, [callback])`](http://www.coolsms.co.kr/MO_API#POSTinsert)
 * senderID
  * [`senderRegister(params, [callback])`](http://www.coolsms.co.kr/SenderID_API#POSTregister)
  * [`senderVerify(params, [callback])`](http://www.coolsms.co.kr/SenderID_API#POSTverify)
  * [`senderDelete(params, [callback])`](http://www.coolsms.co.kr/SenderID_API#POSTdelete)
  * [`senderList([params, callback])`](http://www.coolsms.co.kr/SenderID_API#GETlist)
  * [`senderSetDefault(params, [callback])`](http://www.coolsms.co.kr/SenderID_API#POSTset_default)
  * [`senderGetDefault([params, callback])`](http://www.coolsms.co.kr/SenderID_API#GETget_default)

## License
MIT
