'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _cookie = require('../util/cookie');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let opts = {
  url: 'http://uzone.univs.cn/sso.action',
  method: 'post',
  encoding: null,
  resolveWithFullResponse: true
};

const LoginPromise = auth => {
  return Promise.resolve().then(() => {
    let form = {
      'gUser.loginName': auth.user,
      'gUser.password': auth.pass
    };
    opts['form'] = form;
  }).then(() => {
    return (0, _requestPromise2.default)(opts);
  }).then(res => {
    let str = _iconvLite2.default.decode(res.body, 'gbk');
    let match = str.match(/!\[CDATA\[(.*?)\]\]>/);
    if (!match) throw new Error('返回字符串为空!!');
    if (/操作成功/.test(match[1])) {
      let cks = _cookie2.default.getArr(res.headers['set-cookie']);
      return { code: 0, msg: match[1], cookies: cks };
    } else {
      return { code: 1, msg: match[1] };
    }
  }).catch(e => {
    console.error('login:');
    console.error(e);
  });
};

exports.default = LoginPromise;
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/services/login.js.map